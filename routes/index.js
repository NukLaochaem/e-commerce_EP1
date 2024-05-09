var express = require("express");
var router = express.Router();

var MembershipService = require("../services/MembershipService");
var db = require("../models");
var membershipService = new MembershipService(db);

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
        result: "An unexpected error occurred, failed to populate database",
      },
    });
  }
});

router.post("/search", function (req, res, next) {
  res.render("index", { title: "search" });
});

module.exports = router;
