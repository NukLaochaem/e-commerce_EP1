var express = require("express");
var router = express.Router();

/* GET admin page. */

router.get("/", function (req, res, next) {
  res.render("order", { title: "Express" });
});

//To show / edit all products
router.put("/products", function (req, res, next) {
  res.render("order", { title: "Express" });
});

// To show / edit all brands
router.put("/brands", function (req, res, next) {
  res.render("order", { title: "Express" });
});
