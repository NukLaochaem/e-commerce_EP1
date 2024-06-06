var express = require("express");
var router = express.Router();

var ProductService = require("../services/ProductService");
var db = require("../models");
var productService = new ProductService(db);

const { isAdmin } = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    const products = await productService.getAllProducts();

    res.baseJson(200, "Products found", { products });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  try {
    const { name, description, price, quantity, brand, category, imgurl } =
      req.body;

    if (!name) {
      return res.baseJson(400, "Name is required");
    } else if (!description) {
      return res.baseJson(400, "Description is required");
    } else if (!price) {
      return res.baseJson(400, "Price is required");
    } else if (!quantity) {
      return res.baseJson(400, "Quantity is required");
    } else if (!brand) {
      return res.baseJson(400, "Brand Id number is required");
    } else if (!category) {
      return res.baseJson(400, "Category Id number is required");
    }

    const product = await productService.addProduct(
      name,
      description,
      price,
      quantity,
      brand,
      category,
      imgurl
    );

    res.baseJson(201, "Product has been added", { product });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.put("/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, brandId, categoryId, imgurl } =
      req.body;

    if (
      !name &&
      !description &&
      !price &&
      !quantity &&
      !brandId &&
      !categoryId &&
      !imgurl
    ) {
      return res.baseJson(
        400,
        "At least one field must be provided: name, description, price, quantity, brandId, categoryId, or imgurl"
      );
    }

    const existingProduct = await productService.getProductById(id);

    if (!existingProduct) {
      res.baseJson(404, "Product not found or been deleted");
    }

    const updatedProduct = await productService.updateProduct(id, {
      name,
      description,
      price,
      quantity,
      BrandId: brandId,
      CategoryId: categoryId,
      imgurl,
    });

    res.baseJson(200, "Product has been updated", { updatedProduct });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingProduct = await productService.getProductById(id);
    if (!existingProduct) {
      return res.baseJson(404, "Product not found or has been deleted");
    }

    const product = await productService.deleteProduct(id);

    res.baseJson(200, "Product deleted successfully", { product });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

module.exports = router;
