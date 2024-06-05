var express = require("express");
var router = express.Router();

var ProductService = require("../services/ProductService");
var db = require("../models");
var productService = new ProductService(db);

const { isAdmin } = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    const products = await productService.getAllProducts();

    res.json({
      status: "success",
      statuscode: 200,
      data: { result: "products found", products },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 400,
      data: { result: error.message },
    });
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  try {
    const { name, description, price, quantity, brand, category, imgurl } =
      req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    } else if (!description) {
      return res.status(400).json({ error: "Description is required" });
    } else if (!price) {
      return res.status(400).json({ error: "Price is required" });
    } else if (!quantity) {
      return res.status(400).json({ error: "Quantity is required" });
    } else if (!brand) {
      return res.status(400).json({ error: "Brand Id number is required" });
    } else if (!category) {
      return res.status(400).json({ error: "Category Id number is required" });
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

    res.json({
      status: "sucess",
      statuscode: 200,
      data: { result: "Product has been added", "product:": product },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 400,
      data: { result: error.message },
    });
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
      return res.json({
        status: "error",
        statuscode: 404,
        data: {
          result:
            "Field must be provided: name, description, price, quantity, brandId, categoryId or imgurl",
        },
      });
    }

    const existingProduct = await productService.getProductById(id);

    if (!existingProduct) {
      return res.json({
        status: "error",
        statuscode: 404,
        data: { result: "Product not found or been deleted" },
      });
    }

    const updated = await productService.updateProduct(id, {
      name,
      description,
      price,
      quantity,
      BrandId: brandId,
      CategoryId: categoryId,
      imgurl,
    });

    return res.json({
      status: "success",
      statuscode: 200,
      data: { result: "Product has been updated", product: updated },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 400,
      data: { result: error.message },
    });
  }
});

router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingProduct = await productService.getProductById(id);
    if (!existingProduct) {
      return res.json({
        status: "error",
        statuscode: 404,
        data: { result: "Product not found" },
      });
    }

    const deleted = await productService.deleteProduct(id);

    res.json({
      status: "success",
      statuscode: 200,
      data: { result: "Product deleted successfully", "product:": deleted },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 400,
      data: { result: error.message },
    });
  }
});

module.exports = router;
