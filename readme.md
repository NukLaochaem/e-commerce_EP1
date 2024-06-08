# Noroff

## Overview, Back-end Development Year 1

This project is a back-end system for an existing e-commerce site that converts static data into dynamic data using a back-end system. The project involves creating a MySQL database, developing API endpoints for CRUD operations, implementing user authentication and registration, and providing an admin interface. The project adheres to the 3rd Normal Form database design principles

## Technologies Used

- Node.js
- Express.js
- MySQL
- JWT for authentication
- Swagger for API documentation
- Jest and Supertest for unit testing

## Setup Instructions

1. Clone the repository

   ```
   git clone https://github.com/yourusername/ecommerce-backend.git
   cd ecommerce-backend
   ```

### Install dependencies

```
npm install
```

Create a .env file in the root directory and add the following:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce
JWT_SECRET=yourjwtsecret

### Start the server:

```
npm start
```

### API Endpoints / documented

Access the documentation at http://localhost:3000/doc.

### Testing:

```
npm test
```

## Admin Front-End Interface

The Admin front-end interface is a separate application that interacts with this back-end system via the API endpoints. Ensure that the Admin interface uses the provided API endpoints for all data operations.

### Admin Login Credentials:

- Username: admin
- Password: P@ssword2023

## REFERENCES

\*\* Node.js Documentation
\*\* Express.js Documentation
\*\* MySQL Documentation
\*\* Swagger Documentation
\*\* Jest Documentation
\*\* Supertest Documentation
\*\* w3schools

## Acknowledgments

- AI assistance from ChatGPT for code review and suggestions
- Code snippets and solutions sourced from Stack Overflow, GitHub, and various programming forums.

