# Production Dockerfile for Frontend
FROM node:20

# Set working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the React app for production
RUN npm run build

# Serve the app using a simple HTTP server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose the production port
EXPOSE 3000
