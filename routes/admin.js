var express = require("express");
var router = express.Router();

/* GET admin page. */

router.get("/", function (req, res, next) {
  res.render("order", { title: "Express" });
});

//Admin users can change registered/signed-up user roles to admin from the back-end user interface.
router.get("/users", function (req, res, next) {
  res.render("user", { title: "Express" });
});

// change order status
router.get("/orders", function (req, res, next) {
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
module.exports = router;
