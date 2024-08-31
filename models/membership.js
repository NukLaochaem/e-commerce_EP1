module.exports = (sequelize, Sequelize) => {
  const Membership = sequelize.define("Membership", {
    name: Sequelize.DataTypes.STRING,
    purchaseCount: Sequelize.DataTypes.INTEGER,
    discount: Sequelize.DataTypes.FLOAT,
  });

  Membership.associate = function (models) {
    Membership.hasMany(models.User, { foreignKey: "userId" });
  };

  return Membership;
};
