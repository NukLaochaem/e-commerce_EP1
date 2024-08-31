module.exports = (sequelize, Sequelize) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      cartId: Sequelize.DataTypes.INTEGER,
      productId: Sequelize.DataTypes.INTEGER,
      quantity: Sequelize.DataTypes.INTEGER,
      unitPrice: Sequelize.DataTypes.FLOAT,
    },
    {
      paranoid: true,
    }
  );

  CartItem.associate = function (models) {
    CartItem.belongsTo(models.Cart, { foreignKey: "cartId" });
    CartItem.belongsTo(models.Product, { foreignKey: "productId" });
  };

  return CartItem;
};
