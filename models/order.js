module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "Order",
    {
      orderNumber: Sequelize.DataTypes.STRING,
      userId: Sequelize.DataTypes.INTEGER,
      totalAmount: Sequelize.DataTypes.FLOAT,
      membershipStatus: Sequelize.DataTypes.STRING,
      status: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: "In Progress",
      },
      membershipDiscount: Sequelize.DataTypes.FLOAT,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
    },
    {
      paranoid: true,
    }
  );

  Order.associate = function (models) {
    Order.belongsTo(models.User, { foreignKey: "userId" });
    Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
  };

  return Order;
};
