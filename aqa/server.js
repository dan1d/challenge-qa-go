const express = require('express');
const { exec } = require('child_process');
const WebSocket = require('ws');
const cors = require('cors');
const path = require('path');

const app = express();
// const port = process.env.PORT || 3002;
const port = 3005;

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

const allowedOrigins = ['https://app.qa-challenge.dan1d.dev', 'https://aqa.qa-challenge.dan1d.dev'];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use('/reports', express.static(path.join(__dirname, 'results')));

app.server = app.listen(port, () => {
  console.log(`AQA server running at http://localhost:${port}`);
});
