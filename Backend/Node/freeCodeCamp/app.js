//RODA OS SCRIPTS NO TERMINAL SEMPRE COM node antes, igual pra rodar scripts de python coloca python antes etc

// importing our things from other places

console.log("Hello World from Nodejs");
tutorial = require('./tutorial');
console.log(tutorial);
console.log(tutorial.sum(1, 1));

// ////////////////////////////////////////////
/// event emitter module

const EventEmitter = require('events');
const eventEmitter = new EvemtEmitter();
//atach a listener. A pair of Listener(tutorial) and function that will be executed
//when the tutorial event occurs
eventEmitter.on('tutorial', (num1, num2) => {
    console.log(num1 + num2)
});
// so we need to emit the event for it to work:
eventEmitter.emit('tutorial', 1, 2);

class Person extends EventEmitter {
    constructor(name) {
        super();
        this._name = name;
    }
    get name() {
        return this._name;
    }
}

let pedro = new Person('Pedro');
let christina = new Person('Christina')
pedro.on('name', () => {
    console.log("my name is" + pedro.name)
});
christina.on('name', () => {
    console.log("my name is" + christina.name)
});
// they execute syncronously, in order
pedro.emit('name');
christina.emit('name');

// /////////////////////////////////////
/// readline module


const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let num1 = Math.floor((Math.random() * 10) + 1);
let num2 = Math.floor((Math.random() * 10) + 1);
let answer = num1 + num2;

rl.question(`What is ${num1} + ${num2}? \n`,
    (userInput) => {
        // console.log(userInput);
        if (userInput.trim() == answer) { // trim corta os espacos
            rl.close(); // to close de application on the terminal, emits close event
        } else {
            rl.setPrompt('Incorrect response please try again\n');
            rl.prompt();
            rl.on('line', (userInput) => {
                if (userInput.trim() == answer) {
                    rl.close();
                } else {
                    rl.setPrompt(`Your answer of ${userInput} is incorrect \n try again \n`)
                    rl.prompt(); // we created a loop, the line event is going to keep executing until the user enters the right answer
                }

            })
        }
    });

rl.on('close', () => { // listens to close event
    console.log('Correct!!')
});

///////////////////////////////////
//// File system module

// obs: pra encerrar o terminal: cntrl c ; pra da clear eh: cls
// um exemplo:
const fs = require('fs');

fs.readFile('example-log.txt', function(err, logData) {

    // Se um erro ocorrer, será lançada uma
    // exceção, e a aplicação irá ser encerrada
    if (err) throw err;

    // logData é um Buffer, converta para string
    var text = logData.toString();

    var results = {};

    // Quebrando o arquivo em linhas
    var lines = text.split('\n');

    lines.forEach(function(line) {
        var parts = line.split(' ');
        var letter = parts[1];
        var count = parseInt(parts[2]);

        if (!results[letter]) {
            results[letter] = 0;
        }

        results[letter] += parseInt(count);
    });

    console.log(results);
    // { A: 2, B: 14, C: 6 }
});

// writeFile(file, what is written inside file)
fs.writeFile('example.txt', "this is an example", (err) => {
    if (err)
        console.log(err);
    else
        console.log('File succesfully created');
    fs.readFile('example.txt', 'utf8', (err, file) => {
        if (err)
            console.log(err);
        else
            console.log(file);
    });


});

fs.rename('example.txt', 'example2.txt', (err) => {
    if (err)
        console.log(err);
    else
        console.log('successfully renamed the file')
});

fs.appendFile('example2.txt', 'Some data being appended', (err) => {
    if (err)
        console.log(err);
    else
        console.log('Succesfully appended data to file')
});

fs.unlink('example2.txt', (err) => {
    if (err)
        console.log(err);
    else
        console.log('successfully deleted the file');
});

fs.mkdir('tutorial', (err) => { // to delete a folder is fs.rmdir
    if (err)
        console.log(err);
    else
        console.log('successfully created the folder');
    fs.writeFile('./tutorial/example.txt', '123', (err) => {
        if (err)
            console.log(err);
        else {
            console.log('successfully created file');
        }
    });
});
// we cant remove a directory before deleting its files
// but what if we have a lot of files within a folder and we want to delete all?
fs.readdir('example', (err, files) => { //files is an array with the name of the file
    if (err)
        console.log(err);
    else
        console.log(files);
    for (let file of files) {
        fs.unlink('./example/' + file, (err) => {
            if (err)
                console.log(err)
            else
                console.log('succesfully deleted file')
        })
    }

});

/////////////////////////////////
/// working with readable aand writable streams
/// read and write in chunks

const readStream = fs.createReadStream('./example.txt');
const writeStream = fs.createWriteStream('example2.txt');
// every time we get a piece of data(event), the callback function will be called
// we can start writing even before we have read all of it
// we have to use it for big files
readStream.on('data', (chunk) => {
    WritableStream.write(chunk);
});

///////////////////////////
//Pipes and pipe chaining
const zlib = require('zlib'); //compact files
const gzip = zlib.createGzip();
const readStream = fs.createReadStream('./example.txt');
const writeStream = fs.createWriteStream('example2.gz');
// every time we get a piece of data(event), the callback function will be called
// we can start writing even before we have read all of it
// we have to use it for big files
readStream.pipe(gzip).pipe(writeStream); //much easier

////////////////////////////
////creating a http server using http module

const http = require('http');
//req == request object == what client requets from us
//res == response object == what we respond
const server = http.createServer((req, res) => {
    if (res.url == "/") {
        res.write('Hello world from nodejs');
        res.end(); // stop server
    } else {
        res.write('using some other domain');
        res.end();
    }
})

// server.listen('3000');

///////////////////////////////
///// serving static files with http and file system modules

const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    const readStrem = fs.createReadStream('./static/index.html') // could be example.png
    res.writeHead(200, { 'Content-type': 'text/html' }); // could be image/png
    ReadableStream.pipe(res);
}).listen(3000);

/////////////////////////////
//// create package.json using npm init
// hold all our metadata for the project: name, version number etc

// run npm init in the terminal and respond all messages
// creates package.json file
// all a package is basically reusable code that we can use within our application
//its a folder with one or more modules in it
////////////////////
// go to npmjs.com and pick packages
//npm install lodash
// vai criar uma pasta node modules
// e criar uma dependencia no package.json

// só pra testar o lodash
// _.fill(array, substitituter, start index, end index)
const _ = require('lodash');
let example = _.fill([1, 2, 3, 4, 5], 'banana', 1, 4);
console.log(example);

//////////////////////////////////
////// Semantic Versioning
// is just a standard that a lot od node.js packages follow
// italows us to know whatkind of changes have ocurred in the updated version of the package
// see package.json file 

//////////////////////////////
//////// Getting Started with Express Web Framework
// on the previous tutorials we saw http and file system modules in order to serve static files
// wirh express we can acomplish that and much more with much less code
// run npm init --yes (flag yes makes you skip the questions)
// run npm install express

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(3000); //port

//////////////////////////////
////// Working with Express Get Requests

app.get('/example', (req, res) => {
    res.send('hitting example route')
});

//route parameters and query /////
// a gente pega os valores de name e age em um objeto.
// ":" quer dizer que é dinamico (como no rails)
// how to use query strings:
// in the url type ?nameofthequerystring=value
// and then we get an object

// which one use:
// - use route params when you must have that data
// - use query string in optimal settings, like sorting
app.get('/example/:name/:agr', (req, res) => {
    console.log(req.params);
    console.log(req.query);
    res.send('example with route params');
})

///////////////////////////
// //////serving static files with express
// what is static? html, css, client-side javascipt, images etc

const express = require('express');
const path = require('path');
const app = express();
//middleware. I want to give my static folder an alias
//(dont want people outside of my server to know that is called static)
app.use('/public', express.static(path.join(__dirname, 'static2')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static2', 'index.html'));
});
app.listen(3000); //localhost:3000
// can so same thing with images, videos etc


//////////////////////////////
// //////Http Post Request w/Express and Body Parser module:
// pretend using <form action='/' method="POST"> in the html
//we have email and password fields with buttons
//npm install body-parser

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
//middleware. I want to give my static folder an alias
//(dont want people outside of my server to know that is called static)
app.use('/public', express.static(path.join(__dirname, 'static2')));
// alowing us to parse url encoded forms.Extended is for complicated objects.All we want is just email and password that are strings
app.use(bodyParser.urlencoded({ extendeed: false }));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static2', 'index.html'));
});

app.post('/', (req, res) => {
    console.log(req.body); /* will give an object with email and password keys */
    //database work here
    res.send('successfully posted data')
})

app.listen(3000); //localhost:3000


/////////////////////////
///// Working with JSON Data. Express and Body Parser
// we are going to make the form of the last example post in JSON format now
// we do: <from action="/" method="POST" id="form">
// we put a script with link to jquery (example in youtube app)
// in the index.html right before the second body tag:
/* <script src="jquerylink"></script>
<script>
    $(document).ready(()=>{
        $('form').submit(()=>{ //submit is a handler
            e.preventDefault();
            $.ajax({
                url: '/',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify($('#form').serializeArray()),
                success: (response) => {
                    console.log('succesfully got response');
                    console.log(response);
                }
            });
        });
    });
</script> */

const express = require('express');
const path = require('path');
const joy = require('joy');
const bodyParser = require('body-parser');
const app = express();
//middleware. I want to give my static folder an alias
//(dont want people outside of my server to know that is called static)
app.use('/public', express.static(path.join(__dirname, 'static2')));
// alowing us to parse url encoded forms.Extended is for complicated objects.All we want is just email and password that are strings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static2', 'index.html'));
});

app.post('/', (req, res) => {
    console.log(req.body); /* will give an object with email and password keys */
    const schema = Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(5).max(10).required()
    });
    Joi.validate(req.body, schema, (err, result) => {
            if (err) {
                res.send('an error has occurred');
            }
            console.log(result)
            res.send('succesfully posted data');
        })
        //database work here
        // res.send('successfully posted data')
    res.json({ success: true }); // if the server succesfully receives our the json sended will display suceess true
})

app.listen(3000); //localhost:3000

// but we dont get JSON because our bodyparser module sees that its json and automatically converts it to an javascript object, in this case an array:
[{ name: 'email', value: 'rvevwerv@jeverv.com' },
    { name: 'password', value: 'whebchjbvk' }
]


/////////////////////////////////////
/////User Input Validation with Express and JOI
//npm install joi
// go back in the last code, we just added to it


///////////////////////////////////
///// User Input Validation with Express and JOI pt 2

const Joi = require('joi');
const arrayString = ['banana', 'bacon', 'cheese'];
const arrayObjects = [{ example: 'example1' }, { example: 'example2' }];

const userInput = {
    personalInfo: {
        streetAddress: '123456789',
        city: 'frunrvjrn',
        state: 'rffvr'

    },
    preferences: arrayString
};


const personalInfoSchema = Joi.object.keys({
    streetAddress: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    state: Joi.string().trim().lenght(2).required(),

});

const preferencesSchema = Joi.array().items(Joi.string)

const schema = Joi.object().keys({
    personalInfo: personalInfoSchema,
    preferences: preferencesSchema

});

Joi.validate(userInput, schema, (err, result) => {
    if (err)
        console.log(err)
    else
        console.log(result) // reuslt is the userInput
});

const arrayObjectsSchema = Joi.array().items(Joi.object).keys({
    example: Joi.string().required()
});
// Ai faz o Joi.validate dps (pra testar eh soh trocar arrayofstrings por arrayofobjects)

//////////////////////////////////
/////// Getting started with EJS templates with express
// lets goback to our application
// app.set('view engine', 'ejs');
// create a folder called views that is going to store our ejs templates
// inside put index.ejs


const express = require('express');
const path = require('path');
const joy = require('joi');
const bodyParser = require('body-parser');
const app = express();
//middleware. I want to give my static folder an alias
//(dont want people outside of my server to know that is called static)
app.use('/public', express.static(path.join(__dirname, 'static2')));
// alowing us to parse url encoded forms.Extended is for complicated objects.All we want is just email and password that are strings
// app.use(bodyParser.urlencoded({extended:false}));
// bodyparser checks to see if the user sent any json, processes it and ataches to req.body 
// and then calls a function called next to let the server know can send another request
app.use(bodyparser.json());
// deixa fazer o res.render e usar um arquivo index.ejs dinamico
app.set('view engine', 'ejs');


const people = require('./routes/people');
app.use('/people', people); //'/people' is our base url, tem que vir antes do que ta nas rotas do arquivo 'people'

app.use('/example', (req, res, next) => {
    req.banana = 'banana'
    console.log(req.url, req.method);
    next();
});

app.get('/', (req, res) => {
    console.log(req.banana);
    // res.sendFile(path.join(__dirname, 'static2', 'index.html'));
    res.render('index');
});
app.get('/:userQuery', (req, res) => {
    // res.sendFile(path.join(__dirname, 'static2', 'index.html'));
    res.render('index', {
        data: {
            userQuery: req.params.userQuery,
            searchResults: ['book1', 'book2', 'book3'],
            loggedIn: true,
            username: 'uahushasu'
        }
    });
    // go to html file and :
    // <h1>You Searched For: <%= data.userQuery %><h1>
    // <% if (data.loggedIn){ %>
    //      <h2>You are logged in as: <%= data.username %></h2>
    // <% } %>
    // <ul>
    //     <% data.searchResults.forEach(result=>{ %>
    //         <li><%= result %> </li>
    //    <% }); %>
    // <ul>
    //
});


app.post('/', (req, res) => {
    console.log(req.body); /* will give an object with email and password keys */
    const schema = Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(5).max(10).required()
    });
    Joi.validate(req.body, schema, (err, result) => {
            if (err) {
                res.send('an error has occurred');
            }
            console.log(result)
            res.send('succesfully posted data');
        })
        //database work here
        // res.send('successfully posted data')
    res.json({ success: true }); // if the server succesfully receives our the json sended will display suceess true
})

app.listen(3000); //localhost:3000


//////////////////////////////]
////////MiddleWare
// its the code that gets executed between the user request and the server 
// go back to the application code lets add:
// just going to execute if matches '/example' route
app.use('/example', (req, res, next) => {
    req.banana = 'banana'
    console.log(req.url, req.method);
    next();
});

///////////////////////////////
////////Working with the Express Router
// separate our routes into different files, makes much more managable
//create new folder routes
// new file called people
// put this inside:
const express = require('express');
const route = express.Router();

route.use((req, res, next) => {
    console.log('middleware being used');
    next();
})

route.get('/', (req, res) => {
    res.send('/ being hit');
});

route.get('/example', (req, res) => {
    res.send('/example being hit');
});

module.exports = route;

//now lets go back to the application code and require the people route: