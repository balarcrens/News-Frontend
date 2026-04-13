import axios from 'axios';

const api = axios.create();

// Interceptor for dynamic baseURL switching and authorization
api.interceptors.request.use(config => {
  const method = config.method?.toLowerCase();
  
  // Route GET requests to Vercel, All other methods (POST, PUT, DELETE, etc.) to Render
  if (method === 'get') {
    config.baseURL = import.meta.env.VITE_VERCEL_BACKEND_URL;
  } else {
    config.baseURL = import.meta.env.VITE_RENDER_BACKEND_URL;
  }

  const token = localStorage.getItem('authorization');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
