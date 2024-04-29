module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("Orders", {
    productId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    unitPrice: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Order);
  };

  return Order;
};
