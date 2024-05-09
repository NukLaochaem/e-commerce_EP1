module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("Product", {
    name: Sequelize.DataTypes.STRING,
    description: Sequelize.DataTypes.TEXT,
    price: Sequelize.DataTypes.FLOAT,
    brand: Sequelize.DataTypes.STRING,
    category: Sequelize.DataTypes.STRING,
    date_added: Sequelize.DataTypes.DATE,
    imgurl: Sequelize.DataTypes.STRING,
    quantity: Sequelize.DataTypes.INTEGER,
    deletedAt: Sequelize.DataTypes.DATE,
  });
  Product.associate = function (models) {
    Product.belongsTo(models.Brand);
    Product.belongsTo(models.Category);
  };
  return Product;
};
