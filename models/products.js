module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("Product", {
    name: Sequelize.DataTypes.STRING,
    description: Sequelize.DataTypes.TEXT,
    price: Sequelize.DataTypes.FLOAT,
    deletedAt: Sequelize.DataTypes.DATE, // For soft deletes
  });
  Product.associate = function (models) {
    Product.belongsTo(models.Brand);
    Product.belongsTo(models.Category);
  };
  return Product;
};
