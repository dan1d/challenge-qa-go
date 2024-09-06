import axiosInstance from '../utils/axiosInstance';

export const login = async (email, password) => {
  const response = await axiosInstance.post('/login', { email, password });
  const { token, user } = response.data;

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  return user;
};

export const register = async (email, password, displayName) => {
  const response = await axiosInstance.post('/register', {
    email,
    password,
    displayName,
  });
  const { token, user } = response.data;

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  return user;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};
