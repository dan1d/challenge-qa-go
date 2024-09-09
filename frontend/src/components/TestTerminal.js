import React, { useEffect, useState, useRef } from 'react';
import { Card, Button, Typography } from 'antd';
import './TestTerminal.css';

const { Link, Paragraph } = Typography;

const TestTerminal = ({ onTestFinish }) => {
  const [logs, setLogs] = useState([]);
  const [testFinished, setTestFinished] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    const websocketUrl = process.env.REACT_APP_AQA_WS_URL || 'ws://localhost:3002';
    const ws = new WebSocket(websocketUrl);

    ws.onopen = () => {
      setLogs((prevLogs) => [...prevLogs, 'Connected to test runner...']);
    };

    ws.onmessage = (event) => {
      setLogs((prevLogs) => [...prevLogs, event.data]);

      if (event.data.includes('Cypress tests finished')) {
        setTestFinished(true);
        if (onTestFinish) onTestFinish();
      }
    };

    ws.onclose = () => {
      setLogs((prevLogs) => [...prevLogs, 'Connection closed.']);
    };

    ws.onerror = (error) => {
      setLogs((prevLogs) => [...prevLogs, `WebSocket error: ${error.message}`]);
    };

    return () => {
      ws.close();
    };
  }, [onTestFinish]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const toggleReport = () => {
    setShowReport(!showReport);
  };

  const reportUrl = `${process.env.REACT_APP_AQA_URL}/reports/mochawesome.html`;

  return (
    <Card title="Test Terminal" className="test-terminal-card">
      <div className="test-terminal" ref={terminalRef}>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>

      {testFinished && (
        <>
          <Button
            type="primary"
            block
            style={{ marginTop: '20px' }}
            onClick={toggleReport}
          >
            {showReport ? 'Hide Cypress Report' : 'Show Cypress Report'}
          </Button>

          <Paragraph style={{ marginTop: '10px', textAlign: 'center' }}>
            <Link href={reportUrl} target="_blank" rel="noopener noreferrer">
              View Cypress Report in New Tab
            </Link>
          </Paragraph>
        </>
      )}

      {testFinished && showReport && (
        <div className="test-report">
          <iframe
            src={reportUrl}
            title="Cypress Report"
            width="100%"
            height="500px"
            frameBorder="0"
            style={{ marginTop: '20px' }}
          />
        </div>
      )}
    </Card>
  );
};

export default TestTerminal;
