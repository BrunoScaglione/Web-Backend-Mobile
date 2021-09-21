const express = require ('express');
const requireDir = require('require-dir');
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/noderest', { useNewUrlParser: true, useUnifiedTopology: true });

requireDir("./models");

// precisa saber os models da nossa aplicacao antes por que  dentro do authcontroller(que eh chamado nas rotas)
//  a gente instancia o nosso model const User = mongoose.model('User'); e depois trabalha com ele
// entao ele jah tem que estar criado
app.use("/auth", require("./routes"));

app.listen(3000);

