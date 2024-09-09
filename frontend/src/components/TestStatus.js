import React, { useState, useEffect } from 'react';
import { List, Typography, Spin } from 'antd';

const { Title } = Typography;

const TestStatus = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3002');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      console.log('Received from WebSocket:', event.data); // Debugging log
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error); // Debugging log
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <Title level={3}>Test Status</Title>
      {messages.length === 0 ? (
        <Spin size="large" />
      ) : (
        <List
          size="small"
          bordered
          dataSource={messages}
          renderItem={(message, index) => (
            <List.Item key={index}>{message}</List.Item>
          )}
          style={{ maxHeight: '200px', overflowY: 'auto' }}
        />
      )}
    </div>
  );
};

export default TestStatus;
