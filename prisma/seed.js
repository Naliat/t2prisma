const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Inserir 5 alunos
  await prisma.aluno.createMany({
    data: [
      { nome: "João Silva", idade: 16 },
      { nome: "Maria Souza", idade: 17 },
      { nome: "Carlos Lima", idade: 15 },
      { nome: "Ana Beatriz", idade: 16 },
      { nome: "Rafael Santos", idade: 18 }
    ],
    skipDuplicates: true
  });

  // Inserir 5 professores (cada um associado a uma disciplina)
  await prisma.professor.createMany({
    data: [
      { nome: "Prof. João", disciplina: "Português" },
      { nome: "Prof. Maria", disciplina: "Matemática" },
      { nome: "Prof. Carlos", disciplina: "Ciências" },
      { nome: "Prof. Ana", disciplina: "História" },
      { nome: "Prof. Rafael", disciplina: "Geografia" }
    ],
    skipDuplicates: true
  });

  // Inserir boletins para cada aluno (assumindo IDs de aluno de 1 a 5)
  await prisma.boletim.createMany({
    data: [
      { alunoId: 1, portugues: 8.0, matematica: 7.5, ciencias: 9.0, historia: 7.0, geografia: 8.0 },
      { alunoId: 2, portugues: 9.0, matematica: 8.5, ciencias: 9.0, historia: 8.0, geografia: 8.5 },
      { alunoId: 3, portugues: 7.0, matematica: 6.5, ciencias: 7.5, historia: 7.0, geografia: 7.0 },
      { alunoId: 4, portugues: 8.5, matematica: 8.0, ciencias: 8.0, historia: 8.0, geografia: 8.5 },
      { alunoId: 5, portugues: 9.5, matematica: 9.0, ciencias: 9.0, historia: 9.0, geografia: 9.5 }
    ],
    skipDuplicates: true
  });

  console.log("Banco populado com 5 alunos, 5 professores e boletins com 5 matérias!");
}

main()
  .catch(e => {
    console.error("Erro ao popular o banco:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
