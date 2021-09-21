const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  //obs: Esse "User" nao eh nome de tabela
  // eh users o nome da tabela
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    // um campo virtual soh fica presente no nosso model e nao aparece na db
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING,
  }, {
    hooks: {
      beforeSave: async user => {
        if (user.password) {
          console.log("testeeeeeee");
          user.password_hash = await bcrypt.hash(user.password, 8)
        }
      }
    }
  });

  // aqui nao da pra usar arrow function pois precisamos do acesso à variavel
  // this que se refer a instancia do usuario , o user que salvamos no banco lah no
  // SessionController

  // vai estar disponivel o metodo user.checkPassword
  User.prototype.checkPassword = function(password) {
    return bcrypt.compare(password, this.password_hash)
  }

  User.prototype.generateToken = function() {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET);
  }

  return User;
};