module.exports = (sequelize, Sequelize) => {
  const Brand = sequelize.define(
    "Brand",
    {
      name: Sequelize.DataTypes.STRING,
      deletedAt: Sequelize.DataTypes.DATE,
    },
    {
      paranoid: true,
    }
  );
  Brand.associate = function (models) {
    Brand.hasMany(models.Product);
  };
  return Brand;
};
