# Use an official Cypress image
FROM cypress/included:9.7.0

# Set up the working directory
WORKDIR /e2e

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the test files
COPY . .

# Command to run the Cypress tests
CMD ["npx", "cypress", "run"]
