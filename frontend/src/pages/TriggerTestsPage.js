import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Typography, message as antMessage } from 'antd';
import TestTerminal from '../components/TestTerminal';

const { Title } = Typography;

const TriggerTestsPage = () => {
  const [testsRunning, setTestsRunning] = useState(false);
  const [testFinished, setTestFinished] = useState(false);

  const handleTestFinish = () => {
    setTestsRunning(false);
    setTestFinished(true);
  };

  const triggerTests = async () => {
    const aqaUrl = process.env.REACT_APP_AQA_URL || 'http://localhost:3002';
    setTestsRunning(true);
    setTestFinished(false);
    try {
      const response = await axios.post(`${aqaUrl}/run-tests`);
      if (response.data.message === 'Tests started successfully.') {
        antMessage.success('Tests started successfully.');
      } else {
        antMessage.warning(response.data.message);
        setTestsRunning(false);
      }
    } catch (error) {
      console.error('Error triggering tests', error);
      antMessage.error('Failed to start tests.');
      setTestsRunning(false);
    }
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
