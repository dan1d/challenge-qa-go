const express = require('express');
const { exec } = require('child_process');
const WebSocket = require('ws');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use('/reports', express.static(path.join(__dirname, 'results')));

const wss = new WebSocket.Server({ noServer: true });
let isTestRunning = false;
let testLogs = [];
let currentTestProcess = null;
const clients = new Set();

const broadcast = (message) => {
  clients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  });
};

const runCypress = () => {
  const cypressCommand = 'npx cypress run --browser chrome --headless --config-file cypress.config.js';
  currentTestProcess = exec(cypressCommand);

  currentTestProcess.stdout.on('data', (data) => {
    testLogs.push(data);
    broadcast(data);
  });

  currentTestProcess.stderr.on('data', (data) => {
    testLogs.push(`Error: ${data}`);
    broadcast(`Error: ${data}`);
  });

  currentTestProcess.on('close', (code) => {
    broadcast(`Cypress tests finished with exit code ${code}`);
    isTestRunning = false;
    testLogs = [];
    currentTestProcess = null;
  });
};

app.post('/run-tests', (req, res) => {
  if (isTestRunning) {
    return res.send({ message: 'Tests are already running.' });
  }

  isTestRunning = true;
  testLogs = [];
  runCypress();
  res.send({ message: 'Tests started successfully.' });
});

app.server = app.listen(port, () => {
  console.log(`AQA server running at http://localhost:${port}`);
});

app.server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', (ws) => {
  clients.add(ws);

  if (testLogs.length > 0) {
    testLogs.forEach((log) => ws.send(log));
  }

  ws.on('close', () => {
    clients.delete(ws);
  });

  ws.on('message', (message) => {
    if (message === 'start-tests' && !isTestRunning) {
      runCypress();
    }
  });
});
