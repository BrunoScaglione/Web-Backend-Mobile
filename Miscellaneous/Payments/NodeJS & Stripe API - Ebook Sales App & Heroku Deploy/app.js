const express = require('express');
const stripe = require('stripe')('sk_test_hCznjbAZyxHa9xHsXlm1cP3w00yW2faYq3');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

// we will install globally nodemon to not having to run the server all the time we change things
// nodemon does automatically for us with npm install -g nodemon

const app = express();

// HandlerBars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middlware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Folder (lugaronde a gente vai guardar as imagens)
app.use(express.static(`${__dirname}/public`));

// Index Route // rendering index view inside handlebar
// exemplo de uso do express pra mostrar view
app.get('/', (req, res) => {
  res.render('index');
});

// process.env.PORT pro deploy no heroku
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})


//////// aqui ele terminou de setar as coisas e ia comecar a parte do STRIPE
// mas ai eu nao continua com o tuotorial pq a documentacao dele tava mt antiga e diferente
// mas eu li os docs e manjei jah, o problema ehq nao da pra integrar no lado do cliente no React 
// Native, só na web no ReactJS, entao no React Natie tem que mandar os dados do cartao direto no POST
// da API pra pegar o token e dps outro post pra confimar. A propósito, o pagar.me tambem é muito boom, 
// a documentacao eh t boa, e o processo eh bem parecido. 

//IMPORTANTE: Vou deixar explicado tudo isso melhor cm os links e refrencias pra ver (com partes especificas da
// documentacao numa pasta no mesmo diretorio dessa, chamada How to Payment)