module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    "Category",
    {
      name: Sequelize.DataTypes.STRING,
      deletedAt: Sequelize.DataTypes.DATE,
    },
    {
      paranoid: true,
    }
  );

  Category.associate = function (models) {
    Category.hasMany(models.Product, { foreignKey: "CategoryId" });
  };

  return Category;
};
