var express = require("express");
var router = express.Router();

var CategoryService = require("../services/CategoryService");
var db = require("../models");
var categoryService = new CategoryService(db);

const { isAdmin } = require("../middleware/authMiddleware");

/* GET Categories page. */

router.get("/", async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();

    res.baseJson(200, "Category found", { categories });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.baseJson(400, "Category name required");
    }
    const category = await categoryService.createCategory(name);

    res.baseJson(200, "New category has been added", { category });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingCategory = await categoryService.getCategoryById(id);

    if (!existingCategory) {
      return res.baseJson(400, Category.message);
    }
    if (!name) {
      return res.baseJson(404, "Category name required");
    }

    const updatedCategory = await categoryService.updateCategory(id, { name });

    res.baseJson(200, "Category has been updated", { updatedCategory });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const existingCategory = await categoryService.getCategoryById(id);

    if (!existingCategory) {
      return res.baseJson(400, Category.message);
    }
    const deletedCategory = await categoryService.deleteCategory(id);

    if (deletedCategory) {
      res.baseJson(200, "Category has been deleted succesfully", {
        deletedCategory,
      });
    }
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

module.exports = router;
