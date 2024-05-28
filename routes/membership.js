var express = require("express");
var router = express.Router();

var MembershipService = require("../services/MembershipService");
var db = require("../models");
var membershipService = new MembershipService(db);

/* GET Membership page. */

router.get("/", async (req, res) => {
  try {
    const membership = await membershipService.getAllMembership();

    res.json({
      status: "success",
      statuscode: 200,
      data: { result: "All memberships found", membership },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 500,
      data: { result: error.message },
    });
  }
});

module.exports = router;
