var express = require("express");
var router = express.Router();

var CartService = require("../services/CartService");
var db = require("../models");
var cartService = new CartService(db);

//const { isAuthenticated } = require("../middleware/authMiddleware");

/* GET cart page. */

//getting all the product items that has been added to the cart for the current logged in users active cart (Cart that has not been checked out)
router.post("/", async (req, res) => {
  try {
    const { userId, productId, quantity, unitPrice } = req.body;
    const cartItem = await cartService.addToCart({
      userId,
      productId,
      quantity,
      unitPrice,
    });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

router.post("/checkout/now", async (req, res) => {
  const cartItem = await cartService.checkoutCart({
    userId,
  });
});

router.get("/", async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is available in the request
    const cartItems = await cartService.findAll({ where: { userId } });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

// editing/changing a cart product item quantity
router.put("/", async (req, res) => {
  try {
    const { userId, productId, newQuantity } = req.body;
    await cartService.updateCartItem(
      { quantity: newQuantity },
      { where: { userId, productId } }
    );
    res.json({ message: "Cart item updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart item" });
  }
});

// delete/remove a product item from the current logged in users active cart
router.delete("/", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    await cartService.deleteCartItem({ where: { userId, productId } });
    res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete cart item" });
  }
});
module.exports = router;
