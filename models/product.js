module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "Product",
    {
      name: Sequelize.DataTypes.STRING,
      description: Sequelize.DataTypes.TEXT,
      price: Sequelize.DataTypes.FLOAT,
      date_added: Sequelize.DataTypes.DATE,
      imgurl: Sequelize.DataTypes.STRING,
      quantity: Sequelize.DataTypes.INTEGER,
      deletedAt: Sequelize.DataTypes.DATE,
    },
    {
      paranoid: true,
    }
  );

  Product.beforeCreate((product) => {
    if (!product.date_added) {
      product.date_added = new Date();
    }
  });

  Product.associate = function (models) {
    Product.belongsTo(models.Order, { foreignKey: "OrderId" });
    Product.belongsTo(models.Brand, { foreignKey: "BrandId" });
    Product.belongsTo(models.Category, { foreignKey: "CategoryId" });
  };
  return Product;
};
