var express = require("express");
var router = express.Router();

var OrderService = require("../services/OrderService");
var db = require("../models");
var orderService = new OrderService(db);

//const { isAdmin, isAuthenticated } = require("../middleware/authMiddleware");

/* GET order page. */

// GET /orders - Get all orders for the logged-in user or all orders for all users if an admin user is logged in
router.get("/", async (req, res) => {
  try {
    const orders = await orderService.getAll(req.user.id, req.user.isAdmin);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// PUT or PATCH /order - Change an order status (admin only)
router.put("/", async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;
    await orderService.updateStatus(orderId, newStatus);
    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
});
module.exports = router;
