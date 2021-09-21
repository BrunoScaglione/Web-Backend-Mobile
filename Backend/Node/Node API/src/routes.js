const express = require("express");
const routes=  express.Router();
const requireDir = require("require-dir");

// acho que seria assim mas nao tenho certeza
controllers = requireDir("./app/controllers");
// const authController = require('./controllers/authController')
// const projectController = require('./controllers/projectController')

const authMiddleware = require('./app/middlewares/auth')

routes.post("/register", controllers.authController.store);
routes.post("/authenticate", controllers.authController.authenticate);
routes.post('/forgot_password', controllers.authController.forgotpassword);
routes.post('/reset_password', controllers.authController.resetpassword);
routes.use(authMiddleware);
// pra testar no imnsonia as requisicoes do projectController (onde a gente verifica o header authorization 
// que tem que ter uma token correta)
//vai na aba auth e esscolher bearer e coloca a token
// pra mandar pelo frontend (react) tem q ver um video de autenticacao no react pra 
// ver como manda esse authorization no header desse get aqui em baixo
routes.get("/", controllers.projectController.listprojects);
routes.get("/:projectId", controllers.projectController.showproject)
routes.post("/", controllers.projectController.createproject)
routes.put("/:projectId", controllers.projectController.updateproject)
routes.delete("/:projectId", controllers.projectController.deleteproject)


module.exports = routes;