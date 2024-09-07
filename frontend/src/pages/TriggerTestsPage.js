// src/pages/TriggerTestsPage.js
import React, { useState } from 'react';
import axios from 'axios';
import TestStatus from '../components/TestStatus';

const TriggerTestsPage = () => {
  const [testsRunning, setTestsRunning] = useState(false);

  const triggerTests = async () => {
    setTestsRunning(true);
    try {
      const response = await axios.post('http://localhost:3001/trigger_tests');
      if (response.data.message === 'Tests started successfully.') {
        setTestsRunning(true);
      } else {
        alert(response.data.message); // Show an alert if tests are already running
        setTestsRunning(false);
      }
    } catch (error) {
      console.error('Error triggering tests', error);
      setTestsRunning(false);
    }
  };

  return (
    <div>
      <h1>Trigger Automated Tests</h1>
      <button onClick={triggerTests} disabled={testsRunning}>
        {testsRunning ? 'Tests Running...' : 'Run Tests'}
      </button>
      {testsRunning && <TestStatus />}
    </div>
  );
};

export default TriggerTestsPage;
