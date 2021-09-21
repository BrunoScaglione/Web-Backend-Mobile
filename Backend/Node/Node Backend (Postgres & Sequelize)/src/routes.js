const express = require('express');
const UserController = require('./controllers/UserController');
const AdressController = require('./controllers/AdressController');
const ReportController = require('./controllers/ReportController');

const routes = express.Router();

// routes.get('/', (req, res) => {
//     return res.json({ hello: 'World' });
// });

// vamos criar uma pasta controllers que vai lidar com as requisicoes e passa respostas pro nosso frontend


// fazer uma listagem dos usuarios
routes.get('/users', UserController.index);
//novo usuario no banco de dados
routes.post('/users', UserController.store);

routes.get('/users/:user_id/adresses', AdressController.index);
routes.post('/users/:user_id/adresses', AdressController.store);

// ele pulou o update, destroy porque eh simples e pela documentacao jah da pra entender
routes.get('/users/:user_id/techs', AdressController.index);
routes.post('/users/:user_id/techs', AdressController.store);
routes.delete('/users/:user_id/techs', AdressController.delete);

routes.get('/report', ReportController.show)

module.exports = routes;