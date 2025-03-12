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
  const alunos = await prisma.aluno.findMany({ include: { boletim: true } });
  res.json(alunos);
});

app.get("/alunos/:id", async (req, res) => {
  const aluno = await prisma.aluno.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { boletim: true }
  });
  res.json(aluno);
});

app.post("/alunos", async (req, res) => {
  const { nome, idade } = req.body;
  const aluno = await prisma.aluno.create({ data: { nome, idade: parseInt(idade) } });
  res.json(aluno);
});

app.put("/alunos/:id", async (req, res) => {
  const { nome, idade } = req.body;
  const aluno = await prisma.aluno.update({
    where: { id: parseInt(req.params.id) },
    data: { nome, idade: parseInt(idade) }
  });
  res.json(aluno);
});

app.delete("/alunos/:id", async (req, res) => {
  await prisma.aluno.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: "Aluno removido!" });
});

// ----- Endpoints para Professor -----
app.get("/professores", async (req, res) => {
  const professores = await prisma.professor.findMany();
  res.json(professores);
});

app.get("/professores/:id", async (req, res) => {
  const professor = await prisma.professor.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  res.json(professor);
});

app.post("/professores", async (req, res) => {
  try {
    console.log("Recebendo requisição para adicionar professor:", req.body);

    const { nome, disciplina } = req.body;

    if (!nome || !disciplina) {
      return res.status(400).json({ error: "Nome e disciplina são obrigatórios!" });
    }

    const professor = await prisma.professor.create({
      data: { nome, disciplina },
    });

    console.log("Professor adicionado com sucesso:", professor);
    res.json(professor);
  } catch (error) {
    console.error("Erro ao adicionar professor:", error);
    res.status(500).json({ error: "Erro ao adicionar professor." });
  }
});

app.put("/professores/:id", async (req, res) => {
  const { nome, disciplina } = req.body;
  const professor = await prisma.professor.update({
    where: { id: parseInt(req.params.id) },
    data: { nome, disciplina }
  });
  res.json(professor);
});

app.delete("/professores/:id", async (req, res) => {
  await prisma.professor.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: "Professor removido!" });
});

// ----- Endpoints para Boletim -----
app.get("/boletins", async (req, res) => {
  const boletins = await prisma.boletim.findMany({ include: { aluno: true } });
  res.json(boletins);
});

app.get("/boletins/:id", async (req, res) => {
  const boletim = await prisma.boletim.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { aluno: true }
  });
  res.json(boletim);
});

app.post("/boletins", async (req, res) => {
  const boletim = await prisma.boletim.create({ data: { 
    alunoId: parseInt(req.body.alunoId), 
    portugues: Number(req.body.portugues), 
    matematica: Number(req.body.matematica), 
    ciencias: Number(req.body.ciencias), 
    historia: Number(req.body.historia), 
    geografia: Number(req.body.geografia) 
  }});
  res.json(boletim);
});

app.put("/boletins/:id", async (req, res) => {
  const boletim = await prisma.boletim.update({
    where: { id: parseInt(req.params.id) },
    data: { 
      alunoId: parseInt(req.body.alunoId), 
      portugues: Number(req.body.portugues), 
      matematica: Number(req.body.matematica), 
      ciencias: Number(req.body.ciencias), 
      historia: Number(req.body.historia), 
      geografia: Number(req.body.geografia)
    }
  });
  res.json(boletim);
});

app.delete("/boletins/:id", async (req, res) => {
  await prisma.boletim.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: "Boletim removido!" });
});

// Middleware para tratamento de erros globais
app.use((err, req, res, next) => {
  console.error("Erro inesperado:", err);
  res.status(500).json({ error: "Erro interno no servidor." });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));