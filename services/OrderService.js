class OrderService {
  constructor(db) {
    this.client = db.sequelize;
    this.Order = db.order;
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
