const fs = require('fs');
const path = require('path');
const axios = require('axios');

const resultsPath = path.join(__dirname, 'results', 'results.json');

// Reading the JSON test results
fs.readFile(resultsPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading test results:', err);
    return;
  }

  const testResults = JSON.parse(data);

  // Send the test results to Rails API
  axios
    .post('http://backend:3001/test_results', { testResults })
    .then((response) => {
      console.log('Test results sent successfully:', response.data);
    })
    .catch((error) => {
      console.error('Error sending test results:', error.message);
    });
});
