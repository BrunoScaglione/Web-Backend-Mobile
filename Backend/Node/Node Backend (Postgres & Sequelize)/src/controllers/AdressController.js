const User = require('../models/User');
const Address = require('../models/Adress');


module.exports = {

    async index(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: { asssociation: 'addresses' }
        });

        return res.json(user.adresses);
    },


    async store(req, res) {
        const { user_id } = req.params; // paramateros que vem da rota, que tem o dois pontos
        // mandar nesse ordem o objeto da requisicao
        const { zipcode, street, number } = req.body

        const user = await User.findByPk(user_id); // vamos ver se o usuario existe

        if (!user) { // se retornar nulo
            return res.status(400).json({ error: 'User not found' })
        }

        const adress = await Adress.create({
            zipcode,
            street,
            number,
            user_id,
        });

        return res.json(Address);
    }
}