import axios from 'axios';

let base = import.meta.env.VITE_API_URL || '/api';
if (base.endsWith('/')) {
  base = base.slice(0, -1);
}
if (!base.endsWith('/api') && base.startsWith('http')) {
  base = `${base}/api`;
}

const api = axios.create({
  baseURL: base,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept requests and attach Bearer token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hotelpro_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses to handle auth expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if expired or unauthorized
      if (localStorage.getItem('hotelpro_token')) {
        localStorage.removeItem('hotelpro_token');
        localStorage.removeItem('hotelpro_user');
        window.location.href = '/login?sessionExpired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
