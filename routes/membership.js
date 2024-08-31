var express = require("express");
var router = express.Router();

var MembershipService = require("../services/MembershipService");
var db = require("../models");
var membershipService = new MembershipService(db);

router.get("/", async (req, res) => {
  // #swagger.description = "Getting all the membership status"
  try {
    const membership = await membershipService.getAllMembership();

    res.baseJson(200, "All memberships found", { membership });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

module.exports = router;
