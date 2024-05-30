var express = require("express");
var router = express.Router();
var db = require("../models");

var MembershipService = require("../services/MembershipService");
var membershipService = new MembershipService(db);

var SearchService = require("../services/searchService");
var searchService = new SearchService(db);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/init", async (req, res) => {
  try {
    await membershipService.initializeDatabase();

    return res.json({
      status: "success",
      statuscode: 200,
      data: {
        result: "Database population completed successfully",
      },
    });
  } catch (error) {
    return res.json({
      status: "error",
      statuscode: 500,
      data: {
        result: error.message,
      },
    });
  }
});

router.post("/search", async (req, res) => {
  const { productName, categoryName, brandName } = req.body;

  if (!productName && !categoryName && !brandName) {
    return res.json({
      status: "error",
      statuscode: 400,
      data: {
        result:
          "At least one search criteria (productName, categoryName, brandName) is required.",
      },
    });
  }

  try {
    const products = await searchService.searchProducts({
      productName,
      categoryName,
      brandName,
    });

    res.json({
      statuscode: 200,
      status: "success",
      data: {
        result: "Products found",
        totalFound: products.length,
        items: products,
      },
    });
  } catch (error) {
    res.json({
      statuscode: 400,
      status: "error",
      data: {
        result: error.message,
      },
    });
  }
});

module.exports = router;
