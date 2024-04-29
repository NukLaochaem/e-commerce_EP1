module.exports = (sequelize, Sequelize) => {
  const Brand = sequelize.define("Brands", {
    name: Sequelize.DataTypes.STRING,
  });
  Brand.associate = function (models) {
    Brand.hasMany(models.Product);
  };
  return Brand;
};
