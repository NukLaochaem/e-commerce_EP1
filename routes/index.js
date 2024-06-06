var express = require("express");
var router = express.Router();
var db = require("../models");

var MembershipService = require("../services/MembershipService");
var membershipService = new MembershipService(db);

var SearchService = require("../services/searchService");
var searchService = new SearchService(db);

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    res.render("index", { title: "Admin Login page" });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.post("/init", async (req, res) => {
  try {
    await membershipService.initializeDatabase();

    res.baseJson(200, "Database population completed successfully");
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.post("/search", async (req, res) => {
  const { productName, categoryName, brandName } = req.body;

  if (!productName && !categoryName && !brandName) {
    return res.baseJson(
      400,
      "At least one search criteria (productName, categoryName, brandName) is required."
    );
  }

  try {
    const products = await searchService.searchProducts({
      productName,
      categoryName,
      brandName,
    });
    res.baseJson(200, "Products found", {
      totalFound: products.length,
      products: products,
    });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

module.exports = router;
