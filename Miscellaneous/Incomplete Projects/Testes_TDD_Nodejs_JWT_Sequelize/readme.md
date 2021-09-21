Anotações:

- deixamos separado as portas (em server.js) do resto (tudo que ta no app.js do express: rotas, middlewares etc) pois quando relizarmos os testes nao quermos rodar em nenhuma porta

>> yarn add sequelize pg

>> yarn add sequelize-cli -D

>> yarn sequelize init

mudancas na configuracao que ele faz:

pastas config e models jogamos pra dentro de src

criamos pasta database dentro de src e jogamos as migrations e os seaders lah


como mudamos os locais precisamos dizer para ele:

criamos arquivo .sequelizerc

rodar o banco postgres com docker

vamos criar a database:
>> 

vams criar as migrations:

>> yarn sequelize migration:create --name=create-users

criar a migraiton lah dentro 


>> yarn sequelize db:migrate


vamos fazer alteracoes no index.js dentro de models:

esse arquivo serve pra percorrer todos nossos models eh deixar
eles disponiveis pra gente em toda nossa aplicacao

populando nossa db:

User.create({
  name: "Bruno",
  email: "bruno.c.scaglione@gmail.com",
  password_hash: "19312312499"
});


-------------

agora vamos comecar a parte de testes:

1. Configuacao do Jest:

>> yarn jest --init
sim
node
coverage tests? por enquanto nao, dps vamos configurar no
automatically clear mocks yes

# agora vamos no jest.config.js

bail: true // pros testes pararem assim q encotrar falha

onde ele vai buscar arquivos de teste:
testMatch: [
    "**/__tests__/**/*.test.js?(x)",
  ]



# tipos de testes:

  1. unitarios:
    funcoes puras -> recursos da propria lingagem, nunca tocam em outros recursos

  2. Integracao:
    funcao nao puras -> com efeitos colaterais


  >> yarn add @types/jest

pra rodar os testes:
>> yarn test



/////// vamos configurar variaveis de ambiente ddifernte pra testes e desenvolvimento

-> vamos criar uma sb soh para os testes

-> o sequelize fornce uma base sqlite em formato de arquivo mt facil, vamos usar elacriamos 


# criamos .env e .env.test

>> yarn add sqlite3 -D

para o sqlite nao precismos dar credenciais e coloca soh:
DB_DIALECT=sqlite 

>> yarn add dotenv

pro windows entender o NODE_ENV lah nos scripts, pq tava dando erro
>> yarn add win-node-env


no database.js:
muda de hardcoded pras variaveis de ambiente (host, user, password, dialect)
e ainda colcoa storage pra quando for sqlite

# e coloca o memso codigo que tava no app.js tb lah, pois
# no terminal ele nao tem acesso ao nosso app.js, ele vai acessar diretamente o database.js nas configuracoes

require('dotenv').config({
  //  esse NODE_ENV eh uma variavel que a gente coloca no terminal
  path: process.env.NODE_ENV === 'test' ? 'env.test' : '.env'
})

// antes de fazer yarn test precisamos rodar as migrations,pq
mudamos de base de dados, entao nao criamos a databse no sqlite3

e toda vez que rodarmos o test , ao final vamos desfazer todas as migrations, 
pra gente ficar com o banco de dados sempr e limpo.

ficamos com:

automaticamente tudo que tiver pre eh relizado antes e tudo que tiver post
eh realizado depois

"pretest": "NODE_ENV=test sequelize db:migrate",
"test": "NODE_ENV=test jest",
"posttest": "NODE_ENV=test sequelize db:migrate:undo:all"

-------------

agora vamos partir para os testes reais que vamos usar para construir as funcionalidades

1. rota de autenticacao

>> yarn add supertest -D



tivemos o problema de que quando o teste falha ele nao limpa a database e ai da ruim
pros proximos testes, solucao:

crimaos utils/truncate.js

e colocamos no teste: 
const truncate = require('../utils/truncate');

beforeEach(async () => {
    await truncate();
  })


------

vamos fazer o teste da parte dde encriptacao da password agora:


>> yarn add bcrypt.js



---------

teste pra devolver token jwt:

>> yarn add jsonwebtoken
  

-----------

vamos usar uma ferramente chamada factory girl que vai permitir
a gente ccriar factories, pra reaproveitar o codigo de criacao de usuario nos testes. 

>> yarn add factory-girl


--------

para fazer testes maiores e mais robustos precisamos da biblio faker:

>> yarn add faker

--------------

agora vamos barrar usuarios de entrarem em rotas, essas rotas serao privadas para
usuarios com autenticação apenas
