import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Typography, message as antMessage } from 'antd';
import TestTerminal from '../components/TestTerminal';

const { Title } = Typography;

const TriggerTestsPage = () => {
  const [testsRunning, setTestsRunning] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [ws, setWs] = useState(null);

  const handleTestFinish = () => {
    setTestsRunning(false);
    setTestFinished(true);
  };

  useEffect(() => {
    const websocketUrl = process.env.REACT_APP_AQA_WS_URL || 'wss://ws-aqa.qa-challenge.dan1d.dev/ws';  // Connect to WebSocket server2.js
    const wsInstance = new WebSocket(websocketUrl);

    wsInstance.onopen = () => {
      console.log('WebSocket connection opened');
    };

    wsInstance.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
    };

    wsInstance.onclose = () => {
      console.log('WebSocket connection closed');
    };

    wsInstance.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWs(wsInstance);

    // Cleanup WebSocket on unmount
    return () => {
      wsInstance.close();
    };
  }, []);

  const triggerTests = () => {
    const websocketUrl = 'wss://ws-aqa.qa-challenge.dan1d.dev';
    const ws = new WebSocket(websocketUrl);

    setTestsRunning(true);
    setTestFinished(false);

    ws.onopen = () => {
      // Send WebSocket message to trigger tests
      ws.send('start-tests');
      antMessage.success('Tests started successfully.');
    };

    ws.onmessage = (event) => {
      // Handle WebSocket message (e.g., test updates)
      console.log('WebSocket message:', event.data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      antMessage.error('Failed to start tests.');
      setTestsRunning(false);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
      setTestsRunning(false);
    };
  };


  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '40px 0' }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center' }}>Trigger Automated Tests</Title>
        <Button
          type="primary"
          block
          onClick={triggerTests}
          disabled={testsRunning}
          size="large"
        >
          {testsRunning ? 'Tests Running...' : 'Run Tests'}
        </Button>
      </Card>

      {(testsRunning || testFinished) && (
        <Card style={{ marginTop: '20px' }}>
          <TestTerminal onTestFinish={handleTestFinish} />
        </Card>
      )}
    </div>
  );
};

export default TriggerTestsPage;
