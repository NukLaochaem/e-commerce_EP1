class CartService {
  constructor(db) {
    this.db = db.sequelize;
    this.Cart = db.Cart;
  }

  async addToCart(userId, productId, quantity, unitPrice) {
    return this.Cart.create({ userId, productId, quantity, unitPrice });
  }

  async checkoutCart(userId) {
    // Logic for checking out the cart and creating an order
  }

  async getCart(userId) {
    return this.Cart.findAll({ where: { userId } });
  }

  async updateCartItem(userId, productId, newQuantity) {
    return this.Cart.update(
      { quantity: newQuantity },
      { where: { userId, productId } }
    );
  }

  async deleteCartItem(userId, productId) {
    return this.Cart.destroy({ where: { userId, productId } });
  }
}
module.exports = CartService;
