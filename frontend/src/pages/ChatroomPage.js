import React, { useState, useEffect } from 'react';
import { Layout, message, Spin } from 'antd';
import Sidebar from '../components/Sidebar';
import ChatRoomDetail from '../components/ChatRoomDetail';
import api from '../api';

const { Content } = Layout;

const ChatRoomPage = () => {
  const [currentRoom, setCurrentRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.chatRoom.getChatRooms();
        setRooms(response);
        if (response.length > 0) {
          setCurrentRoom(response[0].id); // Set the first room as default
        }
      } catch (error) {
        console.log(error);
        message.error('Failed to load chat rooms');
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchRooms();
  }, []);

  const onRoomSelect = (roomId) => {
    setCurrentRoom(roomId);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar rooms={rooms} onRoomSelect={onRoomSelect} loading={loading} />
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Spin size="large" />
            </div>
          ) : currentRoom ? (
            <ChatRoomDetail chatRoomId={currentRoom} />
          ) : (
            <p>Select a chat room to start messaging</p>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatRoomPage;
