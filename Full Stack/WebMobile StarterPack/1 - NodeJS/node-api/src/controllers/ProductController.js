const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    async index(req, res) {
        // listar tudo
        // const products = await Product.find();
        // paginacao, nao vai reotrnar tudo vai retornar uma pagina e mostrar mais quantas paginas ainda tem
        // e  quantos docs(objetos) ainda faltam
        // {} aqui dentro podde vir uma codicional , um where
        // ex: https://localhost:3000/products/?page=number
        const {page} = rq.query; // no url eh do tipo ?page=2 aqui ta desestruturado o objeto , poderia ter mais de uma query!
        const products = await Product.paginate({}, {page, limit: 10});

        return res.json(products);
    },
        // ex: https://localhost:3000/products/:id
    async show(req, res) {
        const product = await Product.findById(req.params.id);

        return res.json(product);
    },

    async store (req, res) {
        //Criação
        // ex: https://localhost:3000/products
        const product = await Product.create(req.body);
        // retornando produto que acabou de ser criado na nossa db
        return res.json(product);
    },

    async update(req, res) {
        // ex: https://localhost:3000/products/:id
        // {new:true} eh pra ele devolver jah atualizado
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true})
        
        return res.json(product);
    },

    async destroy(req, res) {
        // ex: https://localhost:3000/products/:id
        await Product.findByIdAndRemove(req.params.id);

        return res.send();
    }

    

}