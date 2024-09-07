// src/components/TestStatus.js
import React, { useState, useEffect } from 'react';
import cable from '../utils/cable';

const TestStatus = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscription = cable.subscriptions.create('TestStatusChannel', {
      received(data) {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2>Test Status</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default TestStatus;
