import axios from 'axios'

// se fossemos usar a nossa api, que esta ainda em desenvolvimento(no localhost)
// aqui teriamos que colocar o IP do pc
const api = axios.create({
    baseURL: 'https://rocketseat-node.herokuapp.com/api'
});

export default api;

