module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("Category", {
    name: Sequelize.DataTypes.STRING,
  });

  Category.associate = function (models) {
    Category.hasMany(models.Product);
  };

  return Category;
};
