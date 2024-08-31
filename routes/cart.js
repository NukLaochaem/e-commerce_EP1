var express = require("express");
var router = express.Router();

var CartService = require("../services/CartService");
var db = require("../models");
var cartService = new CartService(db);

const { isAuthorized } = require("../middleware/authMiddleware");

router.get("/", isAuthorized, async (req, res) => {
  // #swagger.description = "getting all the product items that has been added to the cart for the current logged in users active cart"
  try {
    const cart = await cartService.getCart(req.user.id);

    res.baseJson(200, "Cart found", { cart });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.post("/", isAuthorized, async (req, res) => {
  // #swagger.description = "adding a product to a logged in users cart"
  /* #swagger.parameters['body'] =  { "name": "body","in": "body","schema": {$ref: "#/definitions/cart"}}*/
  try {
    const { productId, quantity } = req.body;

    const cartItem = await cartService.addToCart(
      req.user.id,
      productId,
      quantity
    );

    res.baseJson(200, "Item has been added", { cartItem });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.post("/checkout/now", isAuthorized, async (req, res) => {
  // #swagger.description = "Check out the users cart
  try {
    const order = await cartService.checkoutCart(req.user.id);

    res.baseJson(201, "checkout successfully", { order });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.put("/", isAuthorized, async (req, res) => {
  // #swagger.description = "editing/changing a cart product item quantity"
  try {
    const { productId, quantity } = req.body;

    const cartItem = await cartService.updateCartItem(
      req.user.id,
      productId,
      quantity
    );

    res.baseJson(200, "Cart has been updated", { cartItem });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.delete("/", isAuthorized, async (req, res) => {
  // #swagger.description = "delete/remove a product item from the current logged in users active cart"
  try {
    const { productId } = req.body;

    const cartItem = await cartService.removeCartItem(req.user.id, productId);

    res.baseJson(200, "cartItem has been removed", { cartItem });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

module.exports = router;
