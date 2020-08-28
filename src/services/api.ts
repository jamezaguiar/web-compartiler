import axios from 'axios';

const api = axios.create({
  baseURL: 'https://compartiler.herokuapp.com/',
});

export default api;
