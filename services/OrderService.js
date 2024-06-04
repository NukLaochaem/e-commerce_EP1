class OrderService {
  constructor(db) {
    this.db = db.sequelize;
    this.Order = db.Order;
    this.OrderItem = db.OrderItem;
    this.Product = db.Product;
    this.User = db.User;
  }

  async getOrders(userId, isAdmin) {
    if (isAdmin) {
      return await this.Order.findAll({
        include: [{ model: this.OrderItem, include: [this.Product] }],
      });
    } else {
      return await this.Order.findAll({
        where: { userId },
        include: [{ model: this.OrderItem, include: [this.Product] }],
      });
    }
  }

  async updateOrderStatus(orderId, status) {
    const allowedStatuses = ["In Progress", "Ordered", "Completed"];
    if (!allowedStatuses.includes(status)) {
      throw new Error(
        "Invalid status. Allowed values are: 'In Progress', 'Ordered', 'Completed'."
      );
    }

    const order = await this.Order.findByPk(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    order.status = status;
    await order.save();

    return order;
  }
}

module.exports = OrderService;
