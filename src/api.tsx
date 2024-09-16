import axios from 'axios';

// const user = useAuth();

const url = axios.create({
  baseURL: 'http://localhost:8800/',
});

/** Intercepteur token */

// url.interceptors.request.use((request: any) => {
//   if (useAuth()?.token) {
//     request.headers.Authorization = 'Bearer' + useAuth()?.token;
//   }
//   return request;
// });

export default url;
