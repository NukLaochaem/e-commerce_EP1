class OrderService {
  constructor(db) {
    this.db = db.sequelize;
    this.Order = db.Order;
  }

  async getAll(userId, isAdmin) {
    if (isAdmin) {
      return Order.findAll();
    } else {
      return Order.findAll({ where: { userId } });
    }
  }

  async updateStatus(orderId, newStatus) {
    await Order.update({ status: newStatus }, { where: { id: orderId } });
  }
}

module.exports = OrderService;
