const express = require('express');
const { exec } = require('child_process');
const WebSocket = require('ws');
const cors = require('cors');
const path = require('path');

const app = express();
// const port = process.env.PORT || 3002;
const port = 3005;

const allowedOrigins = ['https://app.qa-challenge.dan1d.dev', 'https://aqa.qa-challenge.dan1d.dev'];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

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
  console.log('Starting Cypress tests...');
  const cypressCommand = 'npx cypress run --browser chrome --headless --config-file cypress.config.js';
  currentTestProcess = exec(cypressCommand);

  currentTestProcess.stdout.on('data', (data) => {
    console.log(`Cypress stdout: ${data}`);
    testLogs.push(data);
    broadcast(data);
  });

  currentTestProcess.stderr.on('data', (data) => {
    console.error(`Cypress stderr: ${data}`);
    testLogs.push(`Error: ${data}`);
    broadcast(`Error: ${data}`);
  });

  currentTestProcess.on('close', (code) => {
    console.log(`Cypress tests finished with exit code ${code}`);
    broadcast(`Cypress tests finished with exit code ${code}`);
    isTestRunning = false;
    testLogs = [];
    currentTestProcess = null;
  });
};

app.post('/run-tests', (req, res) => {
  console.log('Received request to run tests');
  if (isTestRunning) {
    console.log('Tests are already running');
    return res.status(400).send({ message: 'Tests are already running.' });
  }

  isTestRunning = true;
  testLogs = [];
  runCypress();
  res.send({ message: 'Tests started successfully.' });
});


app.get('/ping', (req, res) => {
  console.log('Received ping request');
  res.send({ message: 'pong' });
});


app.server = app.listen(port, () => {
  console.log(`AQA server running at http://localhost:${port}`);
});


app.server.on('upgrade', (request, socket, head) => {
  if (request.url.startsWith('/ws')) {
    console.log('WebSocket connection upgrade');
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  };
});

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  clients.add(ws);

  if (testLogs.length > 0) {
    testLogs.forEach((log) => ws.send(log));
  }

  if (request.url === '/ping') {
    console.log('Received WebSocket ping request');
    ws.send(JSON.stringify({ message: 'pong' }));
  }

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    clients.delete(ws);
  });

  console.log('WebSocket connection established');
  ws.on('message', (message) => {
    console.log(`Received WebSocket message: ${message}`);
    if (message === 'start-tests' && !isTestRunning) {
      runCypress();
    }
  });
});
