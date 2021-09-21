const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// jah vem junto com o node o crypto
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../config/auth')

const User = mongoose.model('User');



function generateToken (params =  {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, // expira em 86400 segundos que eh 1 dia
    })
}

authController = {

    // sign up
    async store (req, res) {

        const {email} = req.body;

        try {
            // quando chegar um email igual que já existe 
            // como o email eh unico a gente usa findOne
            if (await User.findOne({email}))
                return res.status(400).send({error: 'User already exists'});
            const user = await User.create(req.body);

            // nao quermos mostrar devolta a senha para o usuario, tanto que a gente marcou o select:false lah no model
            // porem quando o usuario eh criado, ele jah é armazenado no objeto e nao passa por essa verificacao do select(seria pras queries)
            // entao vamos tirar manualmente aqui

            user.password = undefined
            /// SE A GENTE QUISSESSE FAZER CCONFIRMACAO DO EMAIL
            // se fosse fazer uma confirmacao de email, a gente nao mandaria essa respota com o token pro
            // frontend agora, a gente soh mandaria alguma coisa indicando que foi mandado o email, e ai no front a gente fala
            // pra ele ir ver no email.
            // Ai aqui seria mandado um email com uma token e um link que redireciona ele pra uma janela de confirmacao(ai seria outro controller
            //, na vdd seria bem parecido com o resetpassword sohq que soh  quero que o cara preencha o campo da token)

            // e ai sim, nessa outra pagina a gente devolve o token!
            // soh que a gente agora vai ter que colocar no model User a propriedade confirmed:

            // confirmed: {
            //   type: Datatypes.BOOLEAN,
            //   defaultValue: false,
            //}
            return res.json({
                user, 
                token: generateToken({id: user.id})
            });
        } catch {
            return res.status(400).send({error: 'Registration failed'});
        }

    },

    //login
    async authenticate (req, res) {
        const {email, password } = req.body;

        const user = await User.findOne({email}).select('+password');

        if (!user)
            return res.status(400).send({error: 'User not found'})

        /// SE A GENTE QUISSESSE FAZER CCONFIRMACAO DO EMAIL
        // if (!user.confirmed)
        //     return res.status(400).send({error: 'Email not confirmed'})
            
        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({error: 'Invalid password'})

        user.password = undefined;

        // o segundo parametro eh um hash unico da aplicacao saber que esse token eh dessa aplicacao só
        // na pasta config em auth.json 
        //  vai na internet e gera um hash md5

        res.json({
            user, 
            // lembrando que essa token nao eh a mesma de quando o cara esquece a password!
            token: generateToken({id: user.id})
        })
        
    },

    // forgotpassword?
    async forgotpassword (req, res) {
        const {email} = req.body;

        try {
            // usuario vai enviar o email pra recuperar a senha
            const user = await User.findOne({email});

            if (!user)
                return res.status(400).send({error: 'User not found'})

            // vamos precisar gerar um token(pra ele conseguir recuperar a senha) com data de expiracao pro usuario
            const token = crypto.randomBytes(20).toString('hex');

            // tempo de expiracao(1 hora a mais)
            const now = new Date();
            // acho que seria setTime na real
            now.setHours(now.getHours() + 1);

            // a gente precisa salvar esse token no model do usuario
            // entao vamos criar um campo a mais lah
            // nao precisamos fazer migracao como no sql, mongo jah faz isso

            await User.findByIdAndUpdate(user._id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            });

            //agora precisamos enviar um email pro usuario pra ele consumir 
            // a rota de reset de password por link idealmente (pra ele cair num campo que ai ele consegue preencher
            // com o token que ele vai receber e a gente cnsgue mandar a requisicao pro resetpassword)
            //mas aqui a gente soh vai mandar o token direto pro email do mailtrap pq nao temos front end ainda

            mailer.sendMail({
                // vai mandar pro mailtrap(jah criei uma conta)
                to: email,
                from: 'diego@rocketseat.com.br',
                template: 'auth/forgot_password',
                subject:'resetpassord',
                // n entendi mtbem essa desestruturacao mas ok
                // isso aqui eh short syntax,
                // ele vai substituit a key daqui lah no arquivo onde tiver {{key}}
                //no caso, o nome da key é token 
                context: {token}
            }, (err) => {
                if (err)
                    // acho que pra pegar erro no front e res.txt msms
                    return res.status(400).send({error: 'Cannot send forgot password email'});
                return res.send();
            })

        } catch (err) {
            res.status(400).send({error: 'Erro on forgot password, try again'})
        }

    },


    // reset password
    async resetpassword (req, res) {

        const {email, token, password} = req.body

        try {

            const user = await User.findOne({email})
                .select('+passwordResetToken passwordResetExpires');
            // se usuario existe
            if (!user)
                return res.status(400).send({error: 'User not found'});
            // se o token bate
            if (token !== user.passwordResetToken)
                return res.status(400).send({error: 'Token invalid'});
            // s eo token expirou ou nao
            const now = new Date();

            if (now> user.passwordResetExpires)
                return res.status(400).send({error: 'Token expired, generate a new token'})
            
            // aqui a gente nao precisa fazer ecriptacao porque ela jah ta sendo feita antes de salvar no model
            //olhar User.js em models pra ver
            user.password = password 

            await user.save();
            
            // ele manda o codigo 200 por default 
            // aqui daria 
            res.send();
            

        } catch (err) {
            res.status(400).send({error: 'Cannot reset password, try again'});
        }
    }
}


module.exports = authController;