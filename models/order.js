module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("Order", {
    orderNumber: {
      type: Sequelize.DataTypes.STRING,
      unique: true,
    },
    status: {
      type: Sequelize.DataTypes.STRING,
      defaultValue: "In Progress",
    },
    createdAt: Sequelize.DataTypes.DATE,
    updatedAt: Sequelize.DataTypes.DATE,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User);
    Order.hasMany(models.Product);
  };

  return Order;
};
