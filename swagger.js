const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Exam project API",
    description: "API Documentation",
  },
  host: "localhost:3000",
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "JWT token obtained after login",
    },
  },

  definitions: {
    register: {
      $firstname: "register",
      $lastname: "swagger",
      $username: "swagger",
      $email: "swagger@hotmail.com",
      $password: "password123",
      $address: "swagger",
      $telephonenumber: 1234567890,
    },
    login: {
      $username: "swagger",
      $password: "password123",
    },
    brand: {
      $name: "swagger brand",
    },
    category: {
      $name: "swagger category",
    },
    cart: {
      $productId: 2,
      $quantity: 1,
    },
    order: {
      $status: "In Progress",
    },
    product: {
      $name: "swagger",
      $description: "swagger description",
      $price: 100,
      $quantity: 2,
      $brand: 1,
      $category: 1,
    },
    search: {
      $productName: "iphone",
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./bin/www");
});
