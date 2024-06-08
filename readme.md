# Noroff

## Overview, Back-end Development Exam Project

This project is a back-end system for an existing e-commerce site that converts static data into dynamic data using a back-end system. The project involves creating a MySQL database, developing API endpoints for CRUD operations, implementing user authentication and registration, and providing an admin interface. The project adheres to the 3rd Normal Form database design principles

## Technologies Used

- Node.js
- Express.js: 4.19.2
- MySQL: 2.18.1
- Sequelize: 6.37.3
- Bootstrap: 5.3.3
- Axios: 1.6.8
- dotenv: 16.4.5
- ejs: 3.1.10

JWT for authentication

- jsonwebtoken: 9.0.2

Jest and Supertest for unit testing:

- Jest: 29.7.0
- Supertest: 7.0.0

Swagger for API documentation:

- swagger-autogen: 2.23.7
- swagger-ui-express: 5.0.1

Swagger for API documentation:

- swagger-autogen: 2.23.7
- swagger-ui-express: 5.0.1

## Setup Instructions

1. Clone the repository

```
  git clone https://github.com/yourusername/ecommerce-backend.git
  cd ecommerce-backend
```

2. Install dependencies

```
npm install
```

3. Create a .env file in the root directory and add the following:

- DB_USER= "user"
- DB_PASSWORD= "yourpassword"
- DATABASE_NAME= "ExamProject"
- DIALECT = "mysql"
- DIALECTMODEL = "mysql2"
- PORT = "3000"
- HOST = "localhost"
- JWT_SECRET= "yourjwtsecret"

4. Start the server:

```
npm start
```

The application will start, and you can access it through your web browser at http://localhost:3000

## Testing:

```
npm test
```

## API Endpoints / documented

Access the documentation at http://localhost:3000/doc.

## Admin Front-End Interface

The Admin front-end interface is a separate application that interacts with this back-end system via the API endpoints. Ensure that the Admin interface uses the provided API endpoints for all data operations.

### Admin page Login Credentials:

- Username: admin
- Password: P@ssword2023

## REFERENCES

- Node.js Documentation
- Express.js Documentation
- MySQL Documentation
- Swagger Documentation
- Jest Documentation
- Supertest Documentation
- w3schools
- developer.mozilla.org

## Acknowledgments

- AI assistance from ChatGPT for code review and suggestions
- Code snippets and solutions sourced from Stack Overflow, GitHub, and various programming forums.
