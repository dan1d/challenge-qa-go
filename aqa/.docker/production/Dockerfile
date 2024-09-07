FROM cypress/included:13.14.2

WORKDIR /app

# Copy Cypress config and test files
COPY cypress.config.js .
COPY cypress/ ./cypress/

# Install Cypress (if needed for plugins)
RUN npm install cypress --save-dev

# Command to open Cypress

CMD ["npx", "cypress", "run", "--env", "configFile=production", "--reporter", "junit", "--reporter-options", "mochaFile=/results/test-output.xml"]
