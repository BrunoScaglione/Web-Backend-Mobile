// npm init para cirar package.json
// npm install express
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const requireDir = require("require-dir");

//Iniciando Aplicaçao
const app = express();
// pra permitir que eu envie dados para minha aplicacao no formato json
app.use(express.json());
app.use(cors()); // desse jeito libera acesso a todos os dominios, como
// argumenti eu poderia passar quais os dominios especificos, e outras config

//Iniciando a DB
mongoose.connect('mongodb://localhost:27017/nodeapi', { useNewUrlParser: true, useUnifiedTopology: true })
// require('./src/models/Product');
// mas a gent provavelmente vai ter muitos models  na nossa aplicacao
// entao existe uma biblioteca que importa todos os models que
// a gent ccriou jah, pra nao ter que ficar fazendo mil require
//>> npm install require-dir // ela faz o require em um diretorio de todos os arququivos
requireDir("./src/models");


// const Product = mongoose.model('Product');

// use recebe todas as requisições , eh um wild card
// agora todas a rotas tem o /api antes 
app.use("/api", require("./src/routes"))

app.listen(3001);

// ai roda node server.js para levantar a aplicação

//mas toda vez que a gente muda alguma coisa nao atualiza a pagina, para isso
// vamos precisar do nodemon!
// npm install -D nodemon para instalar como dependencia de desenvolvimento(apenas ambiente de
// desenvolvimento)

// colocamos "dev": "nodemon server.js" nos scipts do package.json

// agora para executar o servidor eh roda npm run dev

// docker: a gente sobe maquinas virtuais(conteiners) que contém nossas instalacoes por exemplo, e se em algum momento
// a gente preciar atualizar o desinstalar fica mt facil porque ela vai ta totalmente separada
// a depois a gente sobe outro conteiner com a instalacao rodando pra gente fazer nossas coisas
// >> docker pull mongo //baixamos a imagem
// >> docker run --name mongodb -p 27017:27017 -d mongo//-p 27017:27017 quer dizer que a porta 27017 acessa a porta 27017 em que 
// esta rodando a aplicacao na maquina virtual ubuntu do docker e -d mongo eh a  a imagem do mongo
// >> docker ps // pra gente ver as imagens que a gente tem e se eles tao rodando e a quanto tempo

//>> nm install mongoose // é um ORM de bancos nao relacionais:
// um ORM abstrai em codigo javascript, pra gente fazer operacoes com nossa banco de dados
// com javascript e nao diretamente atraves de queries e tal

