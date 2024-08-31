module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      orderId: Sequelize.DataTypes.INTEGER,
      productId: Sequelize.DataTypes.INTEGER,
      quantity: Sequelize.DataTypes.INTEGER,
      unitPrice: Sequelize.DataTypes.FLOAT,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
    },
    {
      paranoid: true,
    }
  );

  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Order, { foreignKey: "orderId" });
    OrderItem.belongsTo(models.Product, { foreignKey: "productId" });
  };

  return OrderItem;
};
