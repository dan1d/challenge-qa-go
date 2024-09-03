
# Challenge QA Go

This is a simple chat room application with a focus on Automated QA (AQA) testing. The project consists of a backend API built with Rails and a frontend built with React. This README provides instructions on how to set up and start the project.

## Prerequisites

Before you start, ensure you have the following installed on your system:

- Docker
- Docker Compose

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/challenge-qa-go.git
cd challenge-qa-go
```

### 2. Set Up Environment Variables

Create a `.env` file in the `/frontend` directory with the following content:

```bash
REACT_APP_BACKEND_URL=http://localhost:3001
```

### 3. Build and Run the Containers

Use Docker Compose to build and start the backend and frontend services:

```bash
docker-compose up --build
```

This command will build the Docker images for both the backend and frontend and start the containers.

### 4. Seed the Database

To create some initial test users, run the following command:

```bash
docker-compose exec backend rails db:seed
```

This will populate the database with a few users that you can use to log in.

### 5. Access the Application

- **Frontend**: Open your web browser and go to `http://localhost:3000`.
- **Backend**: The backend API is available at `http://localhost:3001`.

### 6. Available Test Users

For review purposes, you can use the following credentials to log in:

- **Email**: `reviewer@example.com` | **Password**: `review123`
- **Email**: `test1@example.com` | **Password**: `password123`
- **Email**: `test2@example.com` | **Password**: `password123`
- **Email**: `admin@example.com` | **Password**: `admin123`

### 7. Running Tests

If you want to run the Automated QA (AQA) tests:

1. Uncomment the `aqa` service in the `docker-compose.yml` file.
2. Start the services including AQA:

   ```bash
   docker-compose up --build
   ```

3. Run your tests as needed.

### 8. Stopping the Application

To stop the application, simply run:

```bash
docker-compose down
```

This command will stop and remove the containers.

## Additional Notes

- **Database**: The project uses PostgreSQL as the database, and the database service is set up via Docker Compose.
- **Frontend**: The React frontend communicates with the Rails backend via RESTful API endpoints.
- **Backend**: The Rails backend provides API endpoints and handles authentication using JWT.

## Troubleshooting

- If you encounter issues with Docker, try rebuilding the images:

  ```bash
  docker-compose up --build
  ```

- Ensure that your `.env` file is correctly set up with the necessary environment variables.

## License

This project is licensed under the MIT License.
