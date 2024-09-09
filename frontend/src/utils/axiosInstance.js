import axios from 'axios';
import { snakeCase, mapKeys, isPlainObject } from 'lodash';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'https://api.qa-challenge.dan1d.dev',
});

const toSnakeCase = (obj) => {
  if (!isPlainObject(obj)) return obj;

  return mapKeys(obj, (value, key) => snakeCase(key));
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (config.data) {
      config.data = toSnakeCase(config.data);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
