var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/auth/register", function (req, res, next) {
  userService
    .create(req.body.username, req.body.email, req.body.password)
    .then((user) => {
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/index");
      });
    });
});

router.post(
  "/auth/login",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

router.get("/membership", function (req, res, next) {
  res.render("index", { title: "membership" });
});

router.get("/init", function (req, res, next) {
  res.render("index", { title: "intit" });

  const noroffData = "http://backend.restapi.co.za/items/products";
});

router.post("/init", function (req, res, next) {
  res.render("index", { title: "intit" });
});

router.post("/search", function (req, res, next) {
  res.render("index", { title: "search" });
});

module.exports = router;
