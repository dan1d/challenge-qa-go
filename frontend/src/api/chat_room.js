import axiosInstance from '../utils/axiosInstance';

export const getChatRooms = async () => {
  const response = await axiosInstance.get('/chat_rooms');
  return response.data;
};

export const getChatRoomMessages = async (chatRoomId) => {
  const response = await axiosInstance.get(`/chat_rooms/${chatRoomId}/messages`);
  return response.data;
};

export const sendMessage = async (chatRoomId, content) => {
  const response = await axiosInstance.post(`/chat_rooms/${chatRoomId}/messages`, { content });
  return response.data;
};
