import axios from 'axios';

// IMPORTANTE: aqui nao podemos usar o localhost, jah que nao estamos na maquina!
// precisamos subsituir localhost prlo IP do PC
// Ex: http://localhost:3333/api -> http://01.01.01.01:3333/api
//Como descobir o IP do Pc? ir no cmd e rodar ipconfig, que vai mostar varias coisas
// pega o valor do IPv4

const api = axios.create({
  baseURL: 'http://192.168.0.19:3333'
})

export default api;

