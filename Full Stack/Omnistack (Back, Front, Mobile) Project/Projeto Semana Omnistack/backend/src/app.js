const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const {errors} = require('celebrate');

// vamos usar banco SQlite e knex como query builder(queries em javasscript)
// query builder eh um sgundo level, ORM's como Sequelize sao um terceiro level de abstracao
// quando a gente trabalha com muitas entidades, query builder eh melhor

// Entidades do db:
// -ONG
// -INCIDENT (CASO)

// Funcionalidades:
// -Login de ONG
// -Logout de ONG
// -Cadastro de ONG
// -Cadastrar novos casos
// -Deletar casos
// -Listar casos especificos de uma ONG
// -Listar todos os casos
// - Entrar em contato com a ONG

const app = express();
app.use(cors());
app.use(express.json());
// precisa estar abaixo de app.use(express.json());
app.use(routes);
// precisa estar abaixo de app.use(routes);
app.use(errors());

module.exports = app;


