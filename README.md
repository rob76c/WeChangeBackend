# WeChangePost Backend Application

This project is a backend application built using Node.js, Prisma, SQLite, JWT authentication, passwordless authentication, various middlewares, user management functionalities, and Docker containerization.

## Features

- **Node.js**: Backend server using Node.js for handling HTTP requests.
- **Prisma**: Database ORM for interfacing with an SQLite database.
- **SQLite**: Embedded database for storing application data.
- **JWT Authentication**: JSON Web Token-based authentication for secure API access.
- **Passwordless Authentication**: Authentication method without using passwords.
- **Middlewares**: Implemented for authentication, error handling, and more.
- **User Management**: Functionalities for managing users, their profiles, and tweets.
- **Docker Containerization**: Docker setup for containerizing the application.

## Setup

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory and install dependencies:
    ```bash
    npm install
    ```

3. Run database migrations:
    ```bash
    npx prisma migrate dev
    ```

4. Start the application:
    ```bash
    npm start
    ```

## Endpoints

### Authentication Endpoints

- **POST** `/auth/login`: User login endpoint.
- **POST** `/auth/logout`: User logout endpoint.
- **POST** `/auth/reset-password`: Reset password endpoint (passwordless).

### Other Endpoints

There are various other endpoints for user management, tweets, and additional functionalities:

- **Users**:
  - **POST** `/users`: Create a new user.
  - **GET** `/users`: Retrieve user information.
  
- **Posts**:
  - **POST** `/posts`: Create a new post.
  - **GET** `/posts`: Retrieve posts.

## Middlewares

- **authMiddleware**: Middleware for JWT authentication.
- **errorHandlingMiddleware**: Error handling middleware.

## Docker

The project includes a Docker configuration to containerize the application. Ensure Docker is installed on your machine to run the application in a containerized environment.

---

Feel free to contribute or open issues for any improvements!
