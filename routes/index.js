var express = require("express");
var router = express.Router();
var db = require("../models");

var MembershipService = require("../services/MembershipService");
var membershipService = new MembershipService(db);

var SearchService = require("../services/searchService");
var searchService = new SearchService(db);

/* GET home page. */
router.get("/", async (req, res, next) => {
  // #swagger.description = "Render login page for admin dashboard as home page"
  try {
    res.render("index", { title: "Admin Login page" });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.post("/init", async (req, res) => {
  // #swagger.description = "initial database populations for the App, populate role table, Create a initial Admin user in the Users table, Populate the membership table "
  try {
    await membershipService.initializeDatabase();

    res.baseJson(200, "Database population completed successfully");
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.post("/search", async (req, res) => {
  // #swagger.description = "This endpoint is used to search for records in the database"
  /* #swagger.parameters['body'] =  { "name": "body","in": "body","schema": {$ref: "#/definitions/search"}}*/
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
