const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
    supportFile: process.env.CYPRESS_SUPPORT_FILE || 'cypress/support/index.js',
    fixturesFolder: process.env.CYPRESS_FIXTURES_FOLDER || 'cypress/fixtures',
    videosFolder: process.env.CYPRESS_VIDEOS_FOLDER || 'cypress/videos',
    screenshotsFolder: process.env.CYPRESS_SCREENSHOTS_FOLDER || 'cypress/screenshots',
    video: false,
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'results',
    overwrite: false,
    html: true,
    json: true,
  },
});
