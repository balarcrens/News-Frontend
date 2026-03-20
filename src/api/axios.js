import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Root URL
});

// Optional: Interceptors for attaching tokens to headers
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
