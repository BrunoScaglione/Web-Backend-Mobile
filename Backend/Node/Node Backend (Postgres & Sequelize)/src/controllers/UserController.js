const User = require('../models/User');

// pra ficar testando as requisoes usar o postman pq ai nao precisa criar tudo 

module.exports = {
    async index(re, res) {
        const users = await User.findAll();

        return res.json(users);
    },



    async store(req, res) {
        const { name, email } = req.body;

        const user = await User.create({ name, email }); // short notation for name:name, email:email

        return res.json(user);
    }
};