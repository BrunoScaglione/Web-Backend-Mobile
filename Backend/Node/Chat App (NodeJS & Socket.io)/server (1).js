const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);

// servidor socket apartir do http
// socket eh um protocolo que estabelece uma conexao em tempo real de um server ccom o browser
const io = require('socket.io')(server);

// onde vao ficar meu arquivos publicos
app.use(express.static(path.join(__dirname,  'public')));

// onde vao ficar nossa views
app.set('views', path.join(__dirname, 'public'));

// setando html pras nossa views, ejs eh o padrao
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index.html');
});

// na vida real guardariamos numa db mas eh soh um exemplo
let messages = [];

io.on('connection', (socket) => {
  // cada vez ele gera um id diferente  
  console.log(`Socket conectado: ${socket.id}`);

  // pra loadar as msgs anteriores sempre quando a gente abrir o browser, senao soh iria sumir
  // as msgs sao vao ser perdidas se reiniciar o node, mas o ideal pra uma aplicacao real nao eh guardar
  // num array kk e sim numa db, ai a gente soh acessaria a db mesmo
  socket.emit('previousMessages', messages);

  // 'sendMessage' eh o nome que usamos no socket.emit lah no frontend(sript js do html nesse caso)
  socket.on('sendMessage', (data) => {
    console.log(data);
    messages.push(data);
    // pra todos os slintes receberem a msg de um cliente
    socket.broadcast.emit('receivedMessage', data)
  });
});

// Aqui pp.listen nao funciona kkk eu tinha feito isso
server.listen(3003);

