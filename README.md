# Driven Pass

O Driven Pass é uma aplicação de gerenciamento de senhas que utiliza uma abordagem de back-end desenvolvida com o framework Nest. Seu objetivo principal é fornecer aos usuários uma plataforma segura e eficiente para armazenar e gerenciar suas senhas de forma conveniente. O projeto visa oferecer uma solução robusta para as preocupações de segurança relacionadas ao armazenamento de informações sensíveis, ao mesmo tempo em que simplifica a experiência do usuário na gestão de suas credenciais online.

# Sobre este Projeto

Através de recursos cuidadosamente projetados e implementados, o Driven Pass busca garantir a proteção dos dados do usuário, enquanto mantém uma interface intuitiva e fácil de usar.

Este projeto possui 6 rotas:

- /health
Rota para garantir que a aplicação está funcionando.

- /users
Rota que possibilita a criação de contas e acesso a elas.

- /credentials
Rota que possibilita a criação de credenciais, como o nome do serviço, o usuário que está criando a senha e a senha para o serviço.

- /notes
Rota que possibilita a criação de Notas Seguras, que são informações livres em formato de texto.

- /cards
Rota que possibilita o cadastro de cartões, tanto de crédito quanto de débito.

- /erase
Rota que possibilita que o usuário possa deletar sua conta.

# Tecnologias

As seguintes ferramentas e estruturas foram utilizadas na construção deste projeto:

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

# Como executar

1. Clone este repositório
2. Instale as dependências
```bash
npm i
```
3. Copie o arquivo .env.example, configure-o e renomeie-o para .env
4. Aplique as migrações do Prisma ao banco de dados
```bash
npx prisma migrate dev
```
5. Por fim, rode o back-end com
```bash
npm run start
```

## Como rodar os testes

1. Copie o arquivo .env.test.example, configure-o e renomeie-o para .env.test
2. Por fim, rode os testes com o comando
```bash
npm run test:e2e
```
