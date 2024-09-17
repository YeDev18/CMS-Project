import axios from 'axios';

const url = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
export default url;
