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

    res.baseJson(200, "order found", { orders });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.put("/:id", isAdmin, async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await orderService.updateOrderStatus(req.params.id, status);

    res.baseJson(200, "order has been updated", { order });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});
module.exports = router;
