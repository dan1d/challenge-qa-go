import React, { useEffect, useState } from 'react';
import api from '../api';
import { List, Input, Button, Card, message } from 'antd';

const { TextArea } = Input;

const ChatRoomDetail = ({ chatRoomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.chatRoom.getChatRoomMessages(chatRoomId);
        setMessages(response);
        setAccessDenied(false);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          message.error('Access denied to this chat room');
          setAccessDenied(true);
        } else {
          console.error('Failed to fetch messages', error);
        }
      }
    };

    fetchMessages();
  }, [chatRoomId]);

  const sendMessage = async () => {
    try {
      const response = await api.chatRoom.sendMessage(chatRoomId, newMessage);
      setMessages([...messages, response]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  if (accessDenied) {
    return <Card title="Chat Room">You do not have access to this chat room.</Card>;
  }

  return (
    <Card title="Chat Room">
      <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(msg) => (
          <List.Item>
            <List.Item.Meta title={msg.user.displayName} description={msg.content} />
          </List.Item>
        )}
      />
      <TextArea
        rows={4}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <Button type="primary" onClick={sendMessage} name="send">
        Send
      </Button>
    </Card>
  );
};

export default ChatRoomDetail;
