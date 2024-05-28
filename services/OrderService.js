class OrderService {
  constructor(db) {
    this.db = db.sequelize;
    this.Order = db.Order;
    this.OrderItem = db.OrderItem;
    this.Cart = db.Cart;
    this.CartItem = db.CartItem;
  }

  async getOrders(userId, isAdmin) {
    if (isAdmin) {
      return Order.findAll({ include: [OrderItem] });
    }
    return Order.findAll({ where: { userId }, include: [OrderItem] });
  }

  async updateOrderStatus(orderId, status) {
    const order = await Order.findByPk(orderId);
    if (order) {
      order.status = status;
      await order.save();
      return order;
    }
    throw new Error("Order not found");
  }
}

module.exports = OrderService;
