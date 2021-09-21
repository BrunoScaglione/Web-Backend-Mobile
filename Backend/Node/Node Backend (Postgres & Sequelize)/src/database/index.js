const Sequelize = require('sequelize');
const dbConfig = require('../config/databse');

const connection = new Sequelize(dbConfig);



// roda yarn sequlize db: create pra criar a database testnode
// vamos criar uma maigration que vai criar os usuarios
// roda yarn sequelize migration:create --name=create-users
// tem dois metodos na migration:up e down
// up serve pra dizer o que essa migration vai realizar no banco de dados
// o down é pra se der alguma coisa errado e eu precisar desfazer esssa migration , o que eu preciso desfazer no banco de dados
// roda yarn sequelize db:migrate
// ele vai criar DUAS tabelas: a nossa users e outra chamada sequeize meta(aramazena as migrations jah rodadsa na db)

// pra desfazer a ultima migration:
// roda yarn sequelize db:migrate:undo
// mas isso soh funciona se a gente ainda ta em ambiente de desenvolvimento
// se jah foi pra producao cria nova maigration pra desfazer cagada
// ex pra adicionar campo de idade:
// roda yarn sequelize migration:create --name=add-age-field-to-users
// roda yarn sequelize db:migrate
// mas nao quermos esse campo age, foi soh pra demonstrar entao vmo apagar o arquivo de migracao

// agora vamos pra parte de insercao
// a primeira coisa que temos que fazer quando trabalhamos com uma ORM(Sequlize) é criar meu model (vamos criar uma pasta models que vai abrigar eles)
// o model é a representacao de como nossa aplicacao vai se comunicar com o banco de dados, e sao no fromato de classe com letra maiuscula

const User = require('../models/User');
//iniciar o model
User.init(connection);


// ta agora jah vimos as coisas basicas
// agora vamos fazer uma query mais profunda
// queremos buscar os usuarios que tem email que termina com @rocketseat.com.br e ai 
// desses usuarios quero buscar todos os enderecos e as tescologias que comecam com react

//vamos criar um relacionamento 1-N de tabelas: Um usuarios pode ter muitos ederecos
// mas um endereco corresponde a só um usuario

// roda yarn sequelize migration:create --name=create-adresses
// agora que temos nossa tabela criada a proxima coisa é cirar nosso model

const Adress = require('../models/Adress');
///iniciar o model
Adress.init(connection);

User.associate(connection.models);
Address.associate(connection.models);



// agora vmaos fazer um relacionamento N-N
// com a tabela users e uma nova tabela techs
// o banco de dados vai gerar uma tabel pivo
// uma nova tabela que chama user_techs que passa a armazenar o user_id e o tech_id
// a tabela techs nao vaia rmazenar o user_id, mas sim só as tecnolgias com as quais ele trabalha

// vamos comecar criando nossa tabela no banco
// roda yarn sequelize migration:create --name=create-techs
// dps de colocar tudo certinho na migracao pra criar a tabela,
// vamo criar amigracao da tabela pivo:
// roda yarn sequelize migration:create --name=create-user_techs
// roda yarn sequelize db:migrate

// vamos crar agora um controller TechController.js
// e um model Tech.js
// a gente nao precisa cirar um controller pra user_techs

const Tech = require('../models/Tech');
Tech.init(connection);
Tech.associate(connection.models);


// agora vamos construir uma query um pouco mais complexa(de uns 3 relacionamentos entre tabelas)
// se for muito complexa sequelize geralmente nao eh a melhor opcao

// vamos construir um ReportController que vai servir pra gente fzer um relatorio


module.exports = connection;