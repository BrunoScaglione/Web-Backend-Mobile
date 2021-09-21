require('dotenv').config({
  //  esse NODE_ENV eh uma variavel que a gente coloca no terminal
  path: process.env.NODE_ENV === 'test' ? 'env.test' : '.env'
})

// nossos teste nao vao botar nossa aplicacao pra rodar, ele vai importar diretamente
// esse arquivo que declara o express
const express = require('express');

class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
  }


  routes() {
    this.express.use(require('./routes'))
  }

}

module.exports = new AppController().express;