import axios from 'axios';

// essa api a gente criou no modulode NodeJS, seu eu quiser eu coloco a localhost 
// que eu fiz, mas vou por essa soh pra garanntir que ta td certinho nela
const api = axios.create({baseURL: 'https://rocketseat-node.herokuapp.com/api'});

export default api;

