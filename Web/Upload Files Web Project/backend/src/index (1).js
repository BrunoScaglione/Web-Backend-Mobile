require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");

const app = express();

// Databasesetup
// upload eh o novo que vamos dar a base de dados
mongoose.connect(process.env.MONGO_URL, 
{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// poderiamos limitar para apenas alguns dominios:
// ex: app.use(cors({ origin: 'http://meusite.com.br' }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// vai fazer co liberamos acesso na url aos nosso arquivos estaticos que vem apos /files
// ex: base_url/files/46dda8e1c91fdbf52c53da8cb5fa57c1-casa do ted.jpg 
// vai mostrar essa img
app.use('/files', express.static(path.resolve(__dirname, "..", "tmp", "uploads")));

app.use(require("./routes"));

// procura por process.env.PORT (heroku gera isso automatico), senao escolhe 3000
app.listen( process.env.PORT || 3000);