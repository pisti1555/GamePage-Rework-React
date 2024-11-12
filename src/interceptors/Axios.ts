import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('JWToken');
  if (token) {
    config.headers['Accept'] = 'application/json';
    config.headers['Authorization'] = 'Bearer ' + token;
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (error.response.data.message === "JWT expired") {
        localStorage.removeItem('JWToken');
        window.location.href = '/login';
      }
    }
    if (error.response && error.response.status === 404) {
      window.location.href = '/not-found';
    }
    if (error.response && error.response.status === 500) {
      window.location.href = '/internal-server-error';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;