para o typescipt:

>> yarn add typescript -D

>> yarn tsc --init

>> yarn add ts-node-dev -D  
<!-- eh o noemon do typescipt -->

mudou no tsconfig.json:

"target": "es2017"



########## Montando API
Funcionaldades:

## Conexões
- rota para listar o total de conexôes realizadas;
- rota para criar uma nova conexão;

## Aulas
- rota para criar uma aula;
- rota para listar aulas;
  - filtrar por matéria, dia da semana, horário;


vai ser usado banco sqlite com knex(query builder, escrever queries em js)

>> yarn add knex sqlite3


a gente mesmo criou na mão a migração 00_create_users.ts

up eh pra oq vai ser feito
down eh pra oq tem q ser desfeito caso aconteceu algum problema

as migrations sao feitas em javascript no knex, porem como estamos usando 
typescript vamos ter q criar novos comandos no package.json:

"knex:migrate": "knex --knexfile knexfile.ts migrate:latest",
"knex:migrate:rollback": "knex --knexfile knexfile.ts migrate:rollback"


<!-- vai permitir que o nosso front end que esta na porta 3000 consiga acessar onosso backend que ta na 3333, por padrao aplicacoes em
enderecos diferentes nao conseguem acessar -->
>> yarn add cors

yarn add 
@types/cors -D