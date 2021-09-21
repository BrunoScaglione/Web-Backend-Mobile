import axios from 'axios';
import { API_URL} from '../../.env.json';

const api = axios.create({
  // baseURL: 'http://192.168.0.19:3333'
  baseURL: API_URL //produção
})

export default api;

