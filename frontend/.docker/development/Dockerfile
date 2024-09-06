# Development Dockerfile for Frontend
FROM node:20

# Set working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port and start the React app
EXPOSE 3000
CMD ["npm", "start"]
