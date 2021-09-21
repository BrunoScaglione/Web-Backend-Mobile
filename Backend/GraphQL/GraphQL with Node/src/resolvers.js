const User = require('./User');

// acessar o localhost:4000  pra testar ass queries (tipo insomnia)

// o graphql jah espera que a gente receba promises, entao
// !! a gente nao vai ter que fazer esquema de async e await !!

// onde tem underline eh o proxy do graphql mas isso nao eh importante agora pra gente
module.exports = {
  Query: {
    users: () => User.find(),
    // {id} é a desestruturacao do que a gente tinha mandado na requisicao
    user: (_, {id}) => User.findById(id)
  },

  Mutation: {
    // o User.create({name, email} além de criar esse usuário, retorna esse usuário pra gente
    // eu tinha esquecido disso, ai nao tava entendendo como que tava retornando um usuario
    // {name, email} eh a desestruturacao do que a gente tinha mandado na requisicao
    createUser: (_, {name, email}) => User.create({name, email})
  }
};