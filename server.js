const express = require("express");
const cors = require("cors");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Middleware para log de requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (Object.keys(req.body).length) console.log("Body:", req.body);
  next();
});

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Rota raiz - serve o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ----- Endpoints para Aluno -----
app.get("/alunos", async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany({ include: { boletim: true } });
    res.json(alunos);
  } catch (error) {
    console.error("Erro ao listar alunos:", error);
    res.status(500).json({ error: "Erro ao listar alunos" });
  }
});

app.get("/alunos/:id", async (req, res) => {
  try {
    const aluno = await prisma.aluno.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { boletim: true }
    });
    if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });
    res.json(aluno);
  } catch (error) {
    console.error("Erro ao buscar aluno:", error);
    res.status(500).json({ error: "Erro ao buscar aluno" });
  }
});

app.post("/alunos", async (req, res) => {
  try {
    const { nome, idade } = req.body;
    if (!nome || !idade) {
      return res.status(400).json({ error: "Nome e idade são obrigatórios!" });
    }

    const aluno = await prisma.aluno.create({ data: { nome, idade: parseInt(idade) } });
    res.json(aluno);
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    res.status(500).json({ error: "Erro ao criar aluno" });
  }
});

app.put("/alunos/:id", async (req, res) => {
  try {
    const { nome, idade } = req.body;
    const aluno = await prisma.aluno.update({
      where: { id: parseInt(req.params.id) },
      data: { nome, idade: parseInt(idade) }
    });
    res.json(aluno);
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    res.status(500).json({ error: "Erro ao atualizar aluno" });
  }
});

app.delete("/alunos/:id", async (req, res) => {
  try {
    await prisma.aluno.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Aluno removido!" });
  } catch (error) {
    console.error("Erro ao remover aluno:", error);
    res.status(500).json({ error: "Erro ao remover aluno" });
  }
});

// ----- Endpoints para Professor -----
app.get("/professores", async (req, res) => {
  try {
    const professores = await prisma.professor.findMany();
    res.json(professores);
  } catch (error) {
    console.error("Erro ao listar professores:", error);
    res.status(500).json({ error: "Erro ao listar professores" });
  }
});

app.get("/professores/:id", async (req, res) => {
  try {
    const professor = await prisma.professor.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!professor) return res.status(404).json({ error: "Professor não encontrado" });
    res.json(professor);
  } catch (error) {
    console.error("Erro ao buscar professor:", error);
    res.status(500).json({ error: "Erro ao buscar professor" });
  }
});

app.post("/professores", async (req, res) => {
  try {
    const { nome, disciplina } = req.body;
    if (!nome || !disciplina) {
      return res.status(400).json({ error: "Nome e disciplina são obrigatórios!" });
    }

    const professor = await prisma.professor.create({
      data: { nome, disciplina },
    });

    res.json(professor);
  } catch (error) {
    console.error("Erro ao adicionar professor:", error);
    res.status(500).json({ error: "Erro ao adicionar professor" });
  }
});

app.put("/professores/:id", async (req, res) => {
  try {
    const { nome, disciplina } = req.body;
    const professor = await prisma.professor.update({
      where: { id: parseInt(req.params.id) },
      data: { nome, disciplina }
    });
    res.json(professor);
  } catch (error) {
    console.error("Erro ao atualizar professor:", error);
    res.status(500).json({ error: "Erro ao atualizar professor" });
  }
});

app.delete("/professores/:id", async (req, res) => {
  try {
    await prisma.professor.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Professor removido!" });
  } catch (error) {
    console.error("Erro ao remover professor:", error);
    res.status(500).json({ error: "Erro ao remover professor" });
  }
});

// ----- Endpoints para Boletim -----
app.get("/boletins", async (req, res) => {
  try {
    const boletins = await prisma.boletim.findMany({ include: { aluno: true } });
    res.json(boletins);
  } catch (error) {
    console.error("Erro ao listar boletins:", error);
    res.status(500).json({ error: "Erro ao listar boletins" });
  }
});

app.get("/boletins/:id", async (req, res) => {
  try {
    const boletim = await prisma.boletim.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { aluno: true }
    });
    if (!boletim) return res.status(404).json({ error: "Boletim não encontrado" });
    res.json(boletim);
  } catch (error) {
    console.error("Erro ao buscar boletim:", error);
    res.status(500).json({ error: "Erro ao buscar boletim" });
  }
});

app.post("/boletins", async (req, res) => {
  try {
    const { alunoId, portugues, matematica, ciencias, historia, geografia } = req.body;
    const boletim = await prisma.boletim.create({
      data: { 
        alunoId: parseInt(alunoId), 
        portugues: Number(portugues), 
        matematica: Number(matematica), 
        ciencias: Number(ciencias), 
        historia: Number(historia), 
        geografia: Number(geografia) 
      }
    });
    res.json(boletim);
  } catch (error) {
    console.error("Erro ao criar boletim:", error);
    res.status(500).json({ error: "Erro ao criar boletim" });
  }
});

app.put("/boletins/:id", async (req, res) => {
  try {
    const { alunoId, portugues, matematica, ciencias, historia, geografia } = req.body;
    const boletim = await prisma.boletim.update({
      where: { id: parseInt(req.params.id) },
      data: { 
        alunoId: parseInt(alunoId), 
        portugues: Number(portugues), 
        matematica: Number(matematica), 
        ciencias: Number(ciencias), 
        historia: Number(historia), 
        geografia: Number(geografia)
      }
    });
    res.json(boletim);
  } catch (error) {
    console.error("Erro ao atualizar boletim:", error);
    res.status(500).json({ error: "Erro ao atualizar boletim" });
  }
});

app.delete("/boletins/:id", async (req, res) => {
  try {
    await prisma.boletim.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Boletim removido!" });
  } catch (error) {
    console.error("Erro ao remover boletim:", error);
    res.status(500).json({ error: "Erro ao remover boletim" });
  }
});

// Middleware para tratamento de erros globais
app.use((err, req, res, next) => {
  console.error("Erro inesperado:", err);
  res.status(500).json({ error: "Erro interno no servidor." });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
