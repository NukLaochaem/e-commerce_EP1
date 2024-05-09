var express = require("express");
var router = express.Router();

var ProductService = require("../services/ProductService");
var db = require("../models");
var productService = new ProductService(db);

/* GET product page. */

//getting all products
router.get("/", async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// adding new products
router.post("/", async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Create a new product
    const product = await productService.create({ name, description, price });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

// editing/changing a product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    // Find the product by ID and update its attributes
    const [updated] = await productService.update(
      { name, description, price },
      { where: { id } }
    );
    if (updated) {
      res.json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// delete/remove a product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Soft delete the product by updating its status
    const [deleted] = await productService.delete(
      { deletedAt: new Date() },
      { where: { id } }
    );
    if (deleted) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});
module.exports = router;

/*
API Specification
All endpoints specified in each section as required must be included in your project. If you require more endpoints they can be added.
All endpoints must return JSON Objects with valid status codes. Error handling and validation must be implemented in each endpoint
Validation and route protection/authentication/admin checks must be implemented with middleware for all required routes.
NOTE: More properties can be added if required

The base JSON response structure must be used for each endpoint

Base JSON return structure:
{
  "status": "success",
  "statuscode": 200,
  "data":{
    "result": "message of what has been done"
  }
}

Success when create an account:
{
  "status": "success",
  "statuscode": 200,
  "data":{
    "result": "you created an account"
  }
}

Example of a user that logged in with extra information:
{
  "status": "success",
  "statuscode": 200,
  "data":{
    "result": "you are logged in",
    "id": 3,
    "email": "test@hotmail.com",
    "name": "test user",
    "token": "Eyefwerfgojrgiwhfewofiwe"
  }
}

Error:
{
  "status": "error",
  "statuscode": 404,
  "data":{
    "result": "username already exist"
  }
}

Product error JSON return example:
{
  "status": "error",
  "statuscode": 404,
  "data":{
    "result": "no product found",
    "products": []
  }
}
*/
