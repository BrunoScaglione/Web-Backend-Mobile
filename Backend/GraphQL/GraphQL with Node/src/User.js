const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // id nao precisamos declarar
  name: String,
  email: String,
})

module.exports = mongoose.model('User', UserSchema)
