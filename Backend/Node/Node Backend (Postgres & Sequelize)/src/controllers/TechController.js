const User = require('../models/User');
const Tech = require('../models/Tech');


module.exports = {

    async index(req, res) {
        // quero listar todas as tecnologias de um usuário
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            // through representa a tabela pivo, ou seja como passamo array vazio nao vai retornar nada dela
            include: { association: 'techs', attributes: ['name'], through: { attributes: [] } }
        });

        return res.json(user.techs);
    },


    async store(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;
        // verificacao pra  ver se usuario existe
        const user = await User.findByPk(user_id);

        if (!user) { // se retornar nulo
            return res.status(400).json({ error: 'User not found' });
        }

        //agente vai procurar por uma tecnologia e se ele nao existir ele vai criar
        // [tech ´= tecnologia que foi criada ou encontrada por esse metodo, created= booleano se foi criada agora]
        const [tech] = await Tech.findOrCreate({
            where: { name }
        });
        // todda vez que a gente adiciona um relacionamento de muiito pra muitos dentro de um model, ele cria varios metods auxiliares pra gente
        // Onde acha esses metodos auxiliares?
        // vai no manual no sequelize> assosiations>Belongs-To-Manny-Assosiations
        await user.addTech(tech);
        // ele vai adicionar no user techs

        return res.json(tech);
        // o sequlize automaticamente(igual no rails) pliraliza o nome do model pra fazer a tabel
        // o nosso model Techvirou teches pra ele, mas a gente quer usar techs mesmo kkk, entao eh só ir lah no model e forcar o nome com tableName: 'techs'
        // testar a requisicao no postman


        // agoora vamos supor que queremos deletar uma tecnologia do usuário:

    },

    async delete(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;
        // verificacao pra  ver se usuario existe
        const user = await User.findByPk(user_id);

        if (!user) { // se retornar nulo
            return res.status(400).json({ error: 'User not found' });
        }

        const tech = await Tech.findOne({
            where: { name }
        });

        await user.removeTech(tech);
        // soh delete o relacionamento de usuario com tecnologia e nao a tecnologia
        // uma linha da tabela user_techs pivo para de existir
        return res.json();
    }

}