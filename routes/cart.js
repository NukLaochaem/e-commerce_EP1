var express = require("express");
var router = express.Router();

var CartService = require("../services/CartService");
var db = require("../models");
var cartService = new CartService(db);

const { isAuthorized } = require("../middleware/authMiddleware");

/* GET cart page. */

// GET /cart - Get active cart
router.get("/", isAuthorized, async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.id);

    res.json({
      status: "success",
      statuscode: 200,
      data: { result: "Cart found", cart },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 400,
      data: { result: error.message },
    });
  }
});

// POST /cart - Add product to cart
router.post("/", isAuthorized, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cartItem = await cartService.addToCart(
      req.user.id,
      productId,
      quantity
    );

    res.json({
      status: "success",
      statuscode: 200,
      data: { result: "Item has been added", cartItem },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 400,
      data: { result: error.message },
    });
  }
});

// POST /cart/checkout/now - Checkout cart
router.post("/checkout/now", isAuthorized, async (req, res) => {
  try {
    const order = await cartService.checkoutCart(req.user.id);

    res.json({
      status: "success",
      statuscode: 201,
      data: { result: "checkout successfully", data: order },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 400,
      data: { result: error.message },
    });
  }
});

// PUT /cart - Update cart item quantity
router.put("/", isAuthorized, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cartItem = await cartService.updateCartItem(
      req.user.id,
      productId,
      quantity
    );

    res.json({
      status: "success",
      statuscode: 200,
      data: { result: "Cart has been updated", cartItem },
    });
  } catch (error) {
    res.json({
      status: "Error",
      statuscode: 400,
      data: { result: error.message },
    });
  }
});

// DELETE /cart - Remove product from cart
router.delete("/", isAuthorized, async (req, res) => {
  try {
    const { productId } = req.body;

    const cartItem = await cartService.removeCartItem(req.user.id, productId);

    res.json({
      status: "success",
      statuscode: 200,
      data: { result: "cartItem has been removed", cartItem },
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
