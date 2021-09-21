const routes = require('express').Router();

const SessionController = require('./app/controllers/SessionController');

routes.post('/sessions', SessionController.store);

// populated db first

// User.create({
//   name: "Bruno",
//   email: "bruno.c.scaglione@gmail.com",
//   password_hash: "19312312499"
// });

module.exports = routes;