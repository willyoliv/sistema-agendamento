# Sistema de Agendamento ![badge](https://img.shields.io/github/languages/top/willyoliv/sistema-agendamento)

## Tabela de conteúdos
<!--ts-->
   * [Sobre o projeto](#sobre-o-projeto)
   * [Executando o projeto](#executando-o-projeto)
   * [EndPoints](#endpoints)
     * [Adicionar usuário](#adicionar-usuário)
     * [Login](#login)
     * [Adicionar foto de perfil](#adicionar-foto-de-perfil)
     * [Atualizar usuário](#atualizar-usuário)
     * [Buscar todos os colaboradores](#buscar-todos-os-colaboradores)
     * [Cadastrar agendamento](#cadastrar-agendamento)
     * [Buscar todos os agendamentos por usuário](#buscar-todos-os-agendamentos-por-usuário)
     * [Buscar o cronograma de agendamento para um usuário](#buscar-o-cronograma-de-agendamento-para-um-usuário)
     * [Buscar as notificações de agendamento para um usuário](#buscar-as-notificações-de-agendamento-para-um-usuário)
     * [Marcar notificação como lida](#marcar-notificação-como-lida)
<!--te-->


## Sobre o projeto
Construção de uma API REST como Projeto do Módulo 5 **Node.JS - HTTP GET e HTTP POST** do curso da Gama Academy **Hiring Coders 3**.
O projeto tem como principal objetivo o cadastro de usuários e agendamento de consultas.

## Executando o projeto
Abaixo são apresentados os passos necessários para que o projeto possa ser executado.

### Pré-requisitos
O projeto foi criado utilizando o **`Node.js`**. Como pré-requisito principal é necessário ter o **`Node.js`** devidamente instalado em 
seu ambiente de desenvolvimento. Também será necessário ter o **`Docker`** instalado, pois os bancos de dados **Postgres** e **MongoDB** foram usados no projeto
forem iniciados a partir de imagens do Docker Hub.

### Rodando o projeto
```bash

# Clone este repositório
$ git clone https://github.com/willyoliv/sistema-agendamento.git

# Acesse a pasta do projeto no terminal/cmd
$ cd sistema-agendamento

# Baixar as dependências
$ npm i

# Iniciar os containers docker do Postgres e MongoDB
$ docker-compose up -d

# Realizar o migrate para gerar as tabelas no banco
$ npx sequelize-cli db:migrate

# Rodar o projeto
$ npm run dev

```
**OBS.** O projeto por padrão roda em `localhost:3333`, caso a mesma esteja sendo utilizada por outro serviço é necessário alterar o arquivo `server.js` adicionando uma nova porta seguindo o exemplo abaixo.

```
app.listen(3333);
```

## EndPoints
### Adicionar usuário
Para adicionar o usuário é necessário informar os campos `name`, `email`, `password` e como parâmetro **opcional** o `provider`do tipo boolean. Abaixo é apresentado
 o endpoint e um exemplo de body para a requisição.
 
**OBS.** Os atributos possuem validação, o password deve ter no mínimo 6 caracteres e o email deve seguir o padrão de email, caso contrário a resposta para a requisição é `BAD_REQUEST`.

Método **POST** localhost:3333/users

```
{
   "name": "Nome do usuário",
   "email": "usuario@email.com",
   "password": "123456",
   "provider": true
}
```
### Login
Para executar qualquer outra operação será necessário estar autenticado, passando o `email` e `password` de um usuário cadastrado. Esta rota terá como retorno 
um objeto contendo os dados do usuário logado e o **`token`** que deve ser passado para as outras requisições. Abaixo é apresentado o endpoint e um exemplo 
de body para a requisição.

Método **POST** localhost:3333/session
```
{
   "email": "usuario@email.com",
   "password": "123456",
}
```

### Adicionar foto de perfil
Para adicionar a foto de perfil basta enviar o arquivo no body da requisição. 

**OBS.** Para acessar essa rota é preciso estar logado, então será necessário passar o Authorization com o token de autenticação nos headers da requisição.

Método **POST** localhost:3333/files

### Atualizar usuário
É permitido atualizar todos os dados do usuário sendo: `name`, `email`, `password`, `provider`, `photo_id`. Abaixo é apresentado
 o endpoint e um exemplo de body para a requisição.
 
**OBS.** Para acessar essa rota é preciso estar logado, então será necessário passar o Authorization com o token de autenticação nos headers da requisição. 
Os atributos possuem validação, o password deve ter no mínimo 6 caracteres e o email deve seguir o padrão de email. Os campos `password`, `oldPassword` e 
`confirmPassword` também são validados, ou seja, o oldPassword deva ter o mesmo valor cadastrado anteriormente e o password e confirmPassword devem possui 
o mesmo valor. Caso contrário a resposta para a requisição é `BAD_REQUEST`

Método **PUT** localhost:3333/users

```
{
   "name": "Nome do usuário",
   "email": "usuario@email.com",
   "password": "123456",
   "oldPassword": "123456",
   "confirmPassword": "123456",
   "provider": true,
   "photo_id": 1
}
```
### Buscar todos os colaboradores
Abaixo é apresentado o endpoint para obter a lista com todos os colaboradores(**provider=true**).

**OBS.** Para acessar essa rota é preciso estar logado, então será necessário passar o Authorization com o token de autenticação nos headers da requisição.

Método **GET** localhost:3333/collaborator

### Cadastrar agendamento
Para adicionar um agendamento o usuário de informar os campos `collaborator_id` com o id de um usuário colaborador(provider=true), `date` com a data do agendamento.
Abaixo é apresentado o endpoint e um exemplo de body para a requisição.

**OBS.** Para acessar essa rota é preciso estar logado, então será necessário passar o Authorization com o token de autenticação nos headers da requisição. Os 
campos são validados e obrigatórios.

Método **POST** localhost:3333/appointments
```
{
    "collaborator_id": 2,
    "date": "2022-06-06T17:48:00-03:00"
}
```

### Buscar todos os agendamentos por usuário
Abaixo é apresentado o endpoint para obter a lista com todos os agendamentos para um usuário colaborador(**provider=true**).

**OBS.** Para acessar essa rota é preciso estar logado, então será necessário passar o Authorization com o token de autenticação nos headers da requisição. Essa 
rota permite a paginação.

Método **GET** localhost:3333/appointments?page=1

### Buscar o cronograma de agendamento para um usuário
Abaixo é apresentado o endpoint para obter a o cronograma com todos os agendamentos para um usuário.

**OBS.** Para acessar essa rota é preciso estar logado, então será necessário passar o Authorization com o token de autenticação nos headers da requisição. Essa 
exige que uma data seja passada como query params na url.

Método **GET** localhost:3333/schedule?date=2022-06-15T17:48:00-03:00

### Buscar as notificações de agendamento para um usuário
Abaixo é apresentado o endpoint para obter as notificações de agendamento para um usuário.

**OBS.** Para acessar essa rota é preciso estar logado, então será necessário passar o Authorization com o token de autenticação nos headers da requisição.

Método **GET** localhost:3333/notifications

### Marcar notificação como lida
Abaixo é apresentado o endpoint para marcar uma notificações de agendamento como lida. É necessário passar o **`id`** da notificação na url da requisição.

**OBS.** Para acessar essa rota é preciso estar logado, então será necessário passar o Authorization com o token de autenticação nos headers da requisição.

Método **PUT** localhost:3333/notifications/**`id`**

