module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define("Cart", {
    quantity: Sequelize.DataTypes.INTEGER,
    unitPrice: Sequelize.DataTypes.FLOAT,
    createdAt: Sequelize.DataTypes.DATE,
    updatedAt: Sequelize.DataTypes.DATE,
  });
  return Cart;
};
