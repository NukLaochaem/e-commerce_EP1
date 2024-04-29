var express = require("express");
var router = express.Router();

var CategoriesService = require("../services/CategoriesService");
var db = require("../models");
var categoriesService = new CategoriesService(db);

const { isAdmin } = require("../middleware/authMiddleware");

/* GET Categories page. */

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await categoriesService.getAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// POST a new category
router.post("/", isAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await categoriesService.create({ name, description });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to add category" });
  }
});

// PUT update a category
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const [updated] = await categoriesService.update(
      { name, description },
      { where: { id } }
    );
    if (updated) {
      res.json({ message: "Category updated successfully" });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
});

// DELETE remove a category
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const [deleted] = await categoriesService.delete(
      { deletedAt: new Date() },
      { where: { id } }
    );
    if (deleted) {
      res.json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
});

module.exports = router;
