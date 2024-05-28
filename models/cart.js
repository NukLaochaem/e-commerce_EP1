module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define(
    "Cart",
    {
      status: Sequelize.DataTypes.STRING,
      userId: Sequelize.DataTypes.INTEGER,
    },
    {
      paranoid: true,
    }
  );
  Cart.associate = function (models) {
    Cart.hasMany(models.CartItem, { foreignKey: "cartId" });
    Cart.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Cart;
};
