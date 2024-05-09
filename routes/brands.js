var express = require("express");
var router = express.Router();

var BrandService = require("../services/BrandService");
var db = require("../models");
var brandService = new BrandService(db);

//const { isAdmin } = require("../middleware/authMiddleware");

/* GET Brands page. */

//getting all brand
router.get("/", async function (req, res, next) {
  try {
    const brands = await brandService.findAll();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch brand" });
  }
});

// adding new brand
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    // Create a new product
    const brands = await brandService.create({ name, description });
    res.status(201).json(brands);
  } catch (error) {
    res.status(500).json({ error: "Failed to add brand" });
  }
});

// editing/changing a brand
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    // Find the product by ID and update its attributes

    const [updated] = await brandService.update(
      { name, description, price },
      { where: { id } }
    );
    if (updated) {
      res.json({ message: "brand updated successfully" });
    } else {
      res.status(404).json({ error: "brand not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update brand" });
  }
});

// delete/remove a brand
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Soft delete the product by updating its status
    const [deleted] = await brandService.deletebrands(
      { deletedAt: new Date() },
      { where: { id } }
    );
    if (deleted) {
      res.json({ message: "brand deleted successfully" });
    } else {
      res.status(404).json({ error: "brand not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete brand" });
  }
});
module.exports = router;
