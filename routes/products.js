var express = require("express");
var router = express.Router();

var ProductService = require("../services/ProductService");
var db = require("../models");
var ProductService = new ProductService(db);
/* GET product page. */

//getting all products
router.get("/", async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await ProductService.getAll();
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
    const product = await ProductService.create({ name, description, price });
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
    const [updated] = await ProductService.update(
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
    const [deleted] = await ProductService.delete(
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
