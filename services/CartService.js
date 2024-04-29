class cartService {
  constructor(db) {
    this.client = db.sequelize;
    this.cart = db.cart;
  }

  async addToCart(userId, productId, quantity, unitPrice) {
    return this.cart.create({ userId, productId, quantity, unitPrice });
  }

  async checkoutCart(userId) {
    // Logic for checking out the cart and creating an order
  }

  async getCart(userId) {
    return this.cart.findAll({ where: { userId } });
  }

  async updateCartItem(userId, productId, newQuantity) {
    return this.cart.update(
      { quantity: newQuantity },
      { where: { userId, productId } }
    );
  }

  async deleteCartItem(userId, productId) {
    return this.cart.destroy({ where: { userId, productId } });
  }
}
module.exports = cartService;
