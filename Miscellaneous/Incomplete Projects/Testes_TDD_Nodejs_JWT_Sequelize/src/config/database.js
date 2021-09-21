require('dotenv').config({
  //  esse NODE_ENV eh uma variavel que a gente coloca no terminal
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "postgres",
  // onde vamos colocar a database sqlite (se for modo teste)
  storage: './__tests__/database.sqlite',
  operatorsAliases: false,
  logging: false,
  define: {
    // timestamp automatico em todas as tabelas
    timestamp: true,
    // nomes das tabelas com separacao por _
    underscored: true,
    // nomes das colunas tb com separacao por _
    underscoredAll: true
  }
};