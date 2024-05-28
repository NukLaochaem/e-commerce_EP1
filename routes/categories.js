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

    res.json({
      status: "success",
      statuscode: 200,
      data: { result: "Category found", categories },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 500,
      data: { result: error.message },
    });
  }
});

// POST add new category
router.post("/", isAdmin, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({
        status: "error",
        statuscode: 400,
        data: { result: error.message },
      });
    }

    const category = await categoryService.createCategory(name);

    res.json({
      status: "success",
      statuscode: 200,
      data: { result: "New category has been added", category },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to add category" },
    });
  }
});

// PUT update a category
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingCategory = await categoryService.getCategoryById(id);

    if (!existingCategory) {
      return res.json({
        status: "error",
        statuscode: 404,
        data: { result: error.message },
      });
    }
    if (!name) {
      return res.json({
        status: "error",
        statuscode: 404,
        data: { result: "Category name required" },
      });
    }

    const updatedCategory = await categoryService.updateCategory(id, { name });

    return res.json({
      status: "success",
      statuscode: 200,
      data: { result: "Category has been updated", updatedCategory },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 500,
      data: { result: "Failed to update category" },
    });
  }
});

// DELETE remove a category
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const existingCategory = await categoryService.getCategoryById(id);

    if (!existingCategory) {
      return res.json({
        status: "error",
        statuscode: 404,
        data: { result: error.message },
      });
    }

    const deletedCategory = await categoryService.deleteCategory(id);

    if (deletedCategory) {
      res.json({
        status: "success",
        statuscode: 200,
        data: {
          result: "Category has been deleted succesfully",
          deletedCategory,
        },
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 500,
      data: { result: error.message },
    });
  }
});

module.exports = router;
