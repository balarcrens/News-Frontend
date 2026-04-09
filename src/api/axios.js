import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Root URL
});

// Optional: Interceptors for attaching tokens to headers
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authorization');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
