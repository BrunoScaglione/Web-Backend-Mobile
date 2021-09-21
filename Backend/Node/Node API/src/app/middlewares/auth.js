const jwt = require('jsonwebtoken');
const authConfig =  require('../../src/config/auth.json')

// coloquei esse middleware no routes.js

// obs se a gente quisesse fazer apenas para uma rota especifica seria:
//coloca o authMiddleware antes do (req, res) =>
// router.get("/", authMiddleware, (req, res) => {
//     res.send({ok: true})
// })

module.exports = (req, res, next) => {
    // se a gente chamr o next ele vai pro proximo passo que eh o controller
    // se a gente nao chamar o next ele vai parar por aqui 

    //observacao:
    // os tokens jwt sa sempre do tipo :
    // Bearer ahsauhxaisj346356cbnsacjwe345dgwdwmletc

    // vamos fazer umas verificacoes simples pra descartar tokens zuados de primeira
    // ai depois fazemos a verificacao pesada comparando com o token cadastrado

    //verificacao leve:
    // esse req.headers.authorization vai ter q ser Bearer + token
    // e esse token eu jah ta sendo devolvido pro cliente tanto register(sign in) quanto no authenticate(login)
    // entao a gente consegue pegar no frontend (React/ReactNative)
    const authHeader = req.headers.authorization;
    // pra ver como que manda isso pelo react tem um video do rocketseat. Autenticacao rotas react
    if(!authHeader)
        return res.status(401).send({error: 'No token provided'});
    
    const parts = authHeader.split(' ');

    if (!parts.lenght === 2)
        return res.status(401).send({error: 'Token error'});
    
    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({error: 'Token malformatted'});



    //verificação pesada:
    //aqui ele vai conseguir verificar se essa token foi gerada pela minha chave!
    // decoded vai ser o id do usuario caso o token tiver certo
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({error: 'Token invalid'});
        // se quando eu encodei eu tive que passar o id, agora quando decoda eu consigo acessar ele dvolta
        req.userId = decoded._id;

        return next();
    });
};