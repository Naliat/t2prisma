# Sistema de Gestão Escolar

Este projeto consiste em uma aplicação utilizando Node.js, Prisma, PostgreSQL e Express. A aplicação serve para gerenciar alunos, professores e boletins de uma escola, permitindo visualizar, adicionar, atualizar e remover dados de maneira simples e eficiente.

## Tecnologias Usadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para construir a API em Node.js.
- **Prisma**: ORM para facilitar a interação com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar as informações.
- **HTML/CSS/JavaScript**: Tecnologias para a construção da interface web.

## Atenção
Vale resaltar que é necessario criar um .env
``
DATABASE_URL="postgresql://username:password@localhost:5432/school_db?schema=public"
``


## Estrutura do Banco de Dados

O banco de dados possui as seguintes tabelas:

- **Aluno**
  - `id`: Identificador único do aluno (inteiro, chave primária)
  - `nome`: Nome do aluno (string)


- **Professor**
  - `id`: Identificador único do professor (inteiro, chave primária)
  - `nome`: Nome do professor (string)
  - `disciplina`: Disciplina que o professor leciona (string)

- **Boletim**
  - `id`: Identificador único do boletim (inteiro, chave primária)
  - `aluno_id`: Identificador do aluno (chave estrangeira para a tabela `Aluno`)
  - `professor_id`: Identificador do professor (chave estrangeira para a tabela `Professor`)
  - `nota_matematica`: Nota do aluno em Matemática (float)
  - `nota_portugues`: Nota do aluno em Português (float)
  - `nota_historia`: Nota do aluno em História (float)
  - `nota_geografia`: Nota do aluno em Geografia (float)
  - `nota_ciencias`: Nota do aluno em Ciências (float)

## Funcionalidades

A aplicação possui as seguintes funcionalidades:

### Alunos

- **Exibir**: Visualizar todos os alunos cadastrados.
- **Adicionar**: Adicionar um novo aluno com as informações: nome, data de nascimento, e-mail e telefone.
- **Atualizar**: Atualizar as informações de um aluno.
- **Remover**: Remover um aluno do sistema.

### Professores

- **Exibir**: Visualizar todos os professores cadastrados.
- **Adicionar**: Adicionar um novo professor com o nome, e-mail e disciplina.
- **Atualizar**: Atualizar as informações de um professor.
- **Remover**: Remover um professor do sistema.

### Boletins

- **Exibir**: Visualizar as notas dos alunos em 5 disciplinas.
- **Adicionar**: Adicionar um boletim para um aluno, com as notas das 5 disciplinas.
- **Atualizar**: Atualizar as notas de um boletim.
- **Remover**: Remover um boletim de um aluno.

## Setup do Projeto

### Pré-requisitos

- Node.js e npm instalados. Caso não tenha, instale a partir do [site oficial do Node.js](https://nodejs.org/).
- PostgreSQL instalado e configurado. Caso não tenha, instale a partir do [site oficial do PostgreSQL](https://www.postgresql.org/).
- Prisma CLI para gerenciar o banco de dados.

### Passos para rodar o projeto

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/Naliat/t2prisma.git
   cd nome-do-repositorio
