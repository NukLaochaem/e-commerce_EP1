var express = require("express");
var router = express.Router();

var OrderService = require("../services/OrderService");
var db = require("../models");
var orderService = new OrderService(db);

const { isAuthorized } = require("../middleware/authMiddleware");

// GET /orders - Get all orders for logged-in user or all orders for admin
router.get("/", async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";
    const orders = await orderService.getOrders(req.user.id, isAdmin);
    res.status(200).json({ status: "success", data: orders });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

// PUT /orders/:id - Update order status (admin only)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await orderService.updateOrderStatus(req.params.id, status);
    res.status(200).json({ status: "success", data: order });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});
module.exports = router;
