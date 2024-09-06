
# Challenge QA Go

This is a simple chat room application focusing on both public and private messaging functionalities, user authentication, and an intuitive interface. The project demonstrates a fully functional chatroom application that includes a Rails backend API and a React frontend, with a focus on Automated QA (AQA) testing.

## Project Overview

The **Chat Room Application** enables users to communicate in public rooms or through private direct messages. The backend is built with **Ruby on Rails**, and the frontend with **React** using **Ant Design** for UI. The project leverages **JWT authentication**, **Docker** for containerization, and **Traefik** for routing in production. The focus is to create a simple yet scalable architecture with room for Automated QA.

### Features:
- **Public and Private Chat Rooms**: Users can communicate in public rooms or through private one-on-one direct messages.
- **User Authentication**: Secure authentication with JWT.
- **Responsive Frontend**: Built with React and Ant Design for a smooth UI/UX experience.
- **Backend API**: Ruby on Rails backend providing RESTful endpoints.
- **Automated Testing**: Focus on implementing Automated QA with tools like Cypress or Nightwatch (future implementation).
- **Dockerized Environment**: The project can be run using Docker and Docker Compose for easy setup.

---

## Prerequisites

Before starting, ensure that you have the following installed:

- Docker
- Docker Compose

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/challenge-qa-go.git
cd challenge-qa-go
```

### 2. Set Up Environment Variables

Create a `.env` file at the project root by copying the provided `.env.example` file:

```bash
cp .env.example .env
```

Fill in the necessary environment variables, such as `RAILS_SECRET_KEY_BASE`:

```bash
RAILS_SECRET_KEY_BASE=your_rails_secret_key_base1231asdasdasdasd
```

This will set up the required configurations for the database, backend, and frontend.

### 3. Build and Run the Containers

Run the following command to build and start both the backend and frontend services in development mode:

```bash
docker-compose -f docker-compose.development.yml up --build
```

This will build the Docker images and start the containers for both the backend and frontend.

### 4. Seed the Database

To populate the database with initial data, run the following command:

```bash
docker-compose exec backend rails db:seed
```

This will create some initial users that you can use to log in.

### 5. Access the Application

- **Frontend**: Open your web browser and go to [http://localhost:3000](http://localhost:3000) to access the application.
- **Backend**: The backend API will be running at [http://localhost:3001](http://localhost:3001).

### 6. Available Test Users

For testing and review purposes, you can use the following credentials to log in:

- **Email**: `reviewer@example.com` | **Password**: `review123`
- **Email**: `test1@example.com` | **Password**: `password123`
- **Email**: `test2@example.com` | **Password**: `password123`
- **Email**: `admin@example.com` | **Password**: `admin123`

### 7. Running Automated QA (Future Implementation)

We are planning to implement Automated QA using tools like Cypress or Nightwatch. For now, the service is commented out in the Docker configuration.

1. Uncomment the `aqa` service in the `docker-compose.production.yml` file.
2. Start the services with:

   ```bash
   docker-compose -f docker-compose.production.yml up --build
   ```

### 8. Stopping the Application

To stop all services, run:

```bash
docker-compose down
```

This will stop and remove the containers.

---

## Production Setup

In production, we use **Traefik** for routing and SSL termination. Follow these steps for the production environment:

1. Copy the `.env.example` to `.env.production` and configure your production settings.
2. Run the application in production mode using:

   ```bash
   docker-compose -f docker-compose.production.yml up --build
   ```

### Traefik Routes

- **Frontend**: `app.qa-challenge.dan1d.dev`
- **Backend**: `api.qa-challenge.dan1d.dev`
- **Traefik Dashboard**: `qa-challenge.dan1d.dev`

### Swagger API Documentation

The API documentation (Swagger) is available at `http://api.qa-challenge.dan1d.dev/api-docs`.

---

## Troubleshooting

- **Docker Issues**: If you encounter any issues with Docker, try rebuilding the images with:

  ```bash
  docker-compose up --build
  ```

- **Database Issues**: Ensure that your `.env` file contains valid database credentials and is correctly set up.

---

## Links

- **GitHub**: [https://github.com/dan1d](https://github.com/dan1d)
- **LinkedIn**: [https://www.linkedin.com/in/dan1d/](https://www.linkedin.com/in/dan1d/)
- **Portfolio**: [dan1d.dev](https://dan1d.dev)
- **Email**: [danielfromarg@gmail.com](mailto:danielfromarg@gmail.com)

---

## License

This project is licensed under the MIT License.
