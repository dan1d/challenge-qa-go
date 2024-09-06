import axiosInstance from '../utils/axiosInstance';

export const getProfile = async () => {
  const response = await axiosInstance.get('/profile');
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await axiosInstance.put('/profile', data);
  return response.data;
};
