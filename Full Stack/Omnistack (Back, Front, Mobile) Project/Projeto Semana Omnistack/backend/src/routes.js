const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// const connection = require('./database/connection');

const routes = express.Router();

// fica de tarefa validar essa tb
routes.post('/sessions', SessionController.logincheck);

routes.get('/ongs', OngController.index);
// importante, a validacao tem que vir antes da funcao do controller
routes.post('/ongs', celebrate({
  // tem colchetes pq a key eh uma variavel javascript nao queremos a string 'body'
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string.required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);

routes.get('/profile', celebrate({
  // pro header eh um pouco diferente, colocamos dentro do object() e usamos unknown()
  // pq esse unknown? pq em todo header ele jah manda varias coisas por padrao, isso eh pra descartar essas outras proprie
  // dades que ele manda
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string.required,
  }).unknown()
  }), ProfileController.index);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentController.index);

// fica a tarefa pra fazer a validacao desse: juntando a validacao de header(precisa de autorizacao) e de body
// pq precisa ter tirulo, description e value
routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}) , IncidentController.delete);

module.exports = routes;