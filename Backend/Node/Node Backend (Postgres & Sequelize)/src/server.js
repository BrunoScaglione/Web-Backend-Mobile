// yarn init
// yarn add {modules}
// escrever script do nodmoon no package.json 


const express = require('express');
const routes = require('./routes');

require('./database');

const app = express();
// pra ele saber lidar com requisicoes que vem no formato de json
app.use(express.json());

app.use(routes);

app.listen(3333);