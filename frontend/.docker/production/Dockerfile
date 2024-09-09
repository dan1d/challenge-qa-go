# frontend/.docker/production/Dockerfile
FROM node:18-alpine AS build

WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the rest of the app's source code
COPY . .

# Build the app with the environment variables
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}
RUN npm run build

# Serve the built app using a lightweight server like serve
FROM node:18-alpine
WORKDIR /app

COPY --from=build /app/build /app/build
RUN npm install -g serve

CMD ["serve", "-s", "build"]
