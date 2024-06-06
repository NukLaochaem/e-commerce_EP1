var express = require("express");
var router = express.Router();

var BrandService = require("../services/BrandService");
var db = require("../models");
var brandService = new BrandService(db);

const { isAdmin } = require("..//middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    const brands = await brandService.getAllBrand();

    res.baseJson(200, "Brand found", { brands });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Brand name is required" });
    }
    const brand = await brandService.createBrand(name);

    res.baseJson(201, "Brand has been added", { brand });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingBrand = await brandService.getBrandById(id);

    if (!existingBrand) {
      return res.baseJson(404, "Brand not found");
    }
    if (!name) {
      return res.baseJson(404, "Brand name reqiured");
    }
    const updatedBrand = await brandService.updateBrand(id, { name });

    res.baseJson(201, "Brand has been updated", { updatedBrand });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const existingBrand = await brandService.getBrandById(id);

    if (!existingBrand) {
      return res.baseJson(404, "Brand not found");
    }

    const deletedBrand = await brandService.deleteBrand(id);

    if (deletedBrand) {
      res.baseJson(200, "Brand has been deleted succesfully", { deletedBrand });
    }
  } catch (error) {
    res.baseJson(500, error.message);
  }
});
module.exports = router;
