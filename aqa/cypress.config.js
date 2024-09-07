const { defineConfig } = require('cypress')

module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/index.js',
    fixturesFolder: 'cypress/fixtures',
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    video: false,
  },
  reporter: 'json',
  reporterOptions: {
    outputDir: './results',
    overwrite: false,
    json: true,
  },

};
