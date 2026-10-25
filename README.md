# CRUD SaaS Application

A CRUD web application built with **Node.js, Express.js, and JavaScript**, following a layered architecture inspired by clean architecture principles.

The project explores backend development, separation of concerns, database integration, authentication, and containerization with Docker. It supports both MySQL and PostgreSQL through environment-based configuration.

## Overview

The goal of this project is to build a structured web application that demonstrates how to organize a backend into distinct layers, making the code easier to maintain, test, and extend.

Rather than placing all application logic inside route handlers, the project separates responsibilities into controllers, services, repositories, and middleware.

## Features

- **CRUD operations:** organize the application around create, read, update, and delete operations.
- **Layered architecture:** separate routing, controllers, business logic, and data access.
- **Database flexibility:** configure either MySQL or PostgreSQL.
- **Authentication support:** use JSON Web Tokens (JWT) and password hashing with bcrypt.
- **File upload support:** handle uploaded files with Multer.
- **Environment-based configuration:** manage application and database settings through environment variables.
- **Docker support:** containerize the application and run the development environment with Docker Compose.

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| MySQL | Relational database option |
| PostgreSQL | Relational database option |
| pg-promise | PostgreSQL integration |
| mysql2 | MySQL integration |
| JSON Web Tokens | Token-based authentication |
| bcrypt | Password hashing |
| Multer | File upload handling |
| Docker | Application containerization |
| Docker Compose | Local multi-container environment |

## Architecture

The project follows a layered structure to separate application responsibilities.

```text
Client / Browser
       |
       v
     Routes
       |
       v
  Middleware
       |
       v
  Controllers
       |
       v
   Services
       |
       v
  Repositories
       |
       v
 MySQL / PostgreSQL
```

### Layer responsibilities

- **Routes:** define application endpoints and connect them to the appropriate handlers.
- **Middleware:** handle cross-cutting concerns such as request processing and authentication.
- **Controllers:** handle incoming requests and HTTP responses.
- **Services:** encapsulate application and business logic.
- **Repositories:** isolate database access and queries.

This organization helps reduce coupling between the HTTP layer, business logic, and persistence layer.

## Project Structure

```text
crud-saas/
├── bin/                  # Application startup
├── controllers/          # HTTP controllers
├── db/                   # Database configuration
├── docker/               # Docker configuration
├── middleware/           # Express middleware
├── public/               # Public assets and stylesheets
├── repositories/         # Data access layer
├── routes/               # Route definitions
├── services/             # Application logic
├── sql/                  # SQL scripts
├── uploads/              # File upload directory
├── views/                # Server-rendered views
├── .env.example          # Environment variable template
├── Dockerfile            # Application image
├── docker-compose.yml    # Local development services
├── app.js                # Express application setup
└── package.json          # Dependencies and scripts
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js and npm
- MySQL or PostgreSQL
- Git

Alternatively, Docker and Docker Compose can be used to run the application and its supporting services.

### 1. Clone the repository

```bash
git clone https://github.com/JoharyJonathan/crud-saas.git
cd crud-saas
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file at the project root using `.env.example` as a template.

```env
PORT=3000

# Database type: mysql or postgres
DB_TYPE=mysql

# MySQL
MYSQL_HOST=localhost
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DB=exp

# PostgreSQL
PG_HOST=localhost
PG_PORT=5432
PG_USER=your_postgres_user
PG_PASSWORD=your_postgres_password
PG_DB=exp

# Authentication
JWT_SECRET=replace_with_a_secure_random_secret
```

Configure the credentials for the database you intend to use. Set `DB_TYPE` to either `mysql` or `postgres` and ensure the corresponding database is available.

**Security:** never commit your real `.env` file or production secrets to version control.

### 4. Start the application

For development:

```bash
npm run dev
```

For a standard start:

```bash
npm start
```

The application is configured to use port `3000` by default in the example environment configuration. Open the address corresponding to your configured port in your browser.

## Running with Docker

The repository includes a `Dockerfile` and a `docker-compose.yml` for running the application in a containerized environment.

Start the services with:

```bash
docker compose up --build
```

To run them in the background:

```bash
docker compose up --build -d
```

To stop the services:

```bash
docker compose down
```

The Compose configuration includes the application, MySQL, PostgreSQL, and their respective database administration tools.

For persistent database data, the Compose configuration defines named volumes.

> **Security note:** review the default credentials, exposed ports, and database settings in the Docker configuration before using this setup outside local development.

## Learning Objectives

This project provides practical experience with:

- Building a backend using Node.js and Express.js.
- Applying separation of concerns through a layered architecture.
- Integrating relational databases and managing SQL access.
- Implementing authentication-related mechanisms.
- Managing application configuration through environment variables.
- Using Docker and Docker Compose for local development.

## Potential Improvements

Possible next steps include:

- Add automated unit and integration tests.
- Document the API endpoints and request/response formats.
- Add request validation and centralized error handling.
- Improve database migrations and schema management.
- Add structured logging and application monitoring.
- Introduce CI/CD automation for testing and deployment.

## Author

**Johary Jonathan**

* GitHub: [JoharyJonathan](https://github.com/JoharyJonathan)
* LinkedIn : https://www.linkedin.com/in/johary-rabarison-130bb0327/

## License

Refer to the repository's license file for applicable usage and redistribution terms.