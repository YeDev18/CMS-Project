import axios from 'axios';
const url = axios.create({
  baseURL: 'https://dj-declaration.onrender.com',
});

export default url;
