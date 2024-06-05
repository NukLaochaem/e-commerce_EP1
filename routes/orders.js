var express = require("express");
var router = express.Router();

var OrderService = require("../services/OrderService");
var db = require("../models");
var orderService = new OrderService(db);

const { isAuthorized, isAdmin } = require("../middleware/authMiddleware");

router.get("/", isAuthorized, async (req, res, next) => {
  try {
    const isAdminUser = req.user.roleId === 1;
    const orders = await orderService.getOrders(req.user.id, isAdminUser);

    res.json({
      status: "success",
      statuscode: 200,
      data: { result: "order found", orders },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 400,
      data: { result: error.message },
    });
  }
});

router.put("/:id", isAdmin, async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await orderService.updateOrderStatus(req.params.id, status);

    res.json({
      status: "success",
      statuscode: 200,
      data: { result: "order updated", order },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 400,
      data: { result: error.message },
    });
  }
});
module.exports = router;
