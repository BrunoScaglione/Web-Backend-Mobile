const { Op } = require('sequelize');

const User = require('../models/User');


module.exports = {
    // pra mostrar nosso relatorio
    async show(req, res) {
        // Encontrar todos os usuarios  que tem email que termina com Rocketseat.com.br // filtro 1
        // Desses usuários eu quero buscar todos que moram na rua 'Rua Guilherme Gembala' // filtro 2
        // Desses usuários eu quero buscar as tecnologias que começam com React // nao eh um filtro e vamos usar required: false


        const users = await User.findAll({
            attributes: ['name', 'email'],
            //filtro 1
            where: {
                email: {
                    // olhar documentacao sequelize (operators)
                    // pq foi usado colchetes em volta?
                    // porque Op.ilike é uma variavel que queremos usar como key ou chave
                    // se tirarmos ele vai entender como string
                    // com o colchetes ele vai colocar o valor dessa variavel como chave
                    [Op.ilike]: '%@rocketseat.com.br'
                }
            },
            include: [
                // por baixo dos panos ele ta realizando um innerjoin entre a tabela de enderecos após selecionar só os usuarios que moram nessa rua pra mostrar pra gente
                // da pra ver o  que ele fez por baixo dos panos(no postgres msm) só olhando o terminal
                // enderecos               // filtro 1
                { association: 'adresses', where: { street: 'Rua Guilherme Gembala' } },
                // tecnologias
                {
                    association: 'techs',
                    // nao eh um filtro, ainda quero mostrar usuarios que nao usam essa tecnologia. Pois o meu objetivo eh soh mostrar as tecnologias
                    // sem o required: false ele reliza um INNER JOIN das tabelas users e adresses, por isso os dois tem que satisfazer
                    // com o required: false ele faz um INNER OUTER JOIN, e sempre vai mostrar o usuario nao importa oq a gente passou pra ele no where
                    required: false,
                    where: {
                        name: {
                            [Op.ilike]: 'React%'
                        }
                    }
                },
            ]
        })
    }
};