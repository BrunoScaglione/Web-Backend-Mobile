// vamos usar o mailtrap
// mas pra ambiente de producoa nao eh bom usar ele
const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const exphbs = require('express-handlebars');

const {host, port, auth:{user, pass}} = require('../config/mail.js');


let transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass}
  });

  // vamos criar em resources/mail pra guardar nossos templates  de email

  const viewPath = resolve(__dirname, '..', 'app', 'resources', 'mail')

  transport.use(
    'compile', 
    hbs({
        viewEngine: exphbs(),
        viewPath,
        extName: '.html',
    }),


  )

  module.exports = transport;