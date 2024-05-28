var express = require("express");
var router = express.Router();

var BrandService = require("../services/BrandService");
var db = require("../models");
var brandService = new BrandService(db);

const { isAdmin } = require("..//middleware/authMiddleware");

/* GET Brands page. */
router.get("/", async (req, res) => {
  try {
    const brands = await brandService.getAllBrand();

    res.json({
      status: "success",
      statuscode: 200,
      data: { result: "Brand found", brands },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 500,
      data: { result: error.message },
    });
  }
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Brand name is required" });
    }

    const brand = await brandService.createBrand(name);

    res.status(201).json({
      status: "success",
      statuscode: 201,
      data: { result: "Brand has been added", brand },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      statuscode: 500,
      data: { result: error.message },
    });
  }
});

// editing/changing a brand
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingBrand = await brandService.getBrandById(id);

    if (!existingBrand) {
      return res.json({
        status: "error",
        statuscode: 404,
        data: { result: "Brand not found" },
      });
    }
    if (!name) {
      return res.json({
        status: "error",
        statuscode: 404,
        data: { result: "Brand name required" },
      });
    }

    const updatedBrand = await brandService.updateBrand(id, { name });

    return res.json({
      status: "success",
      statuscode: 200,
      data: { result: "Brand has been updated", updatedBrand },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 500,
      data: { result: error.message },
    });
  }
});

// delete/remove a brand
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const existingBrand = await brandService.getBrandById(id);

    if (!existingBrand) {
      return res.json({
        status: "error",
        statuscode: 404,
        data: { result: "Brand not found" },
      });
    }

    const deletedBrand = await brandService.deleteBrand(id);

    if (deletedBrand) {
      res.json({
        status: "success",
        statuscode: 200,
        data: {
          result: "Brand has been deleted succesfully",
          deletedBrand,
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
