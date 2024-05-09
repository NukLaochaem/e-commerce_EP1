module.exports = (sequelize, Sequelize) => {
  const Brand = sequelize.define("Brand", {
    name: Sequelize.DataTypes.STRING,
  });
  Brand.associate = function (models) {
    Brand.hasMany(models.Product);
  };
  return Brand;
};
