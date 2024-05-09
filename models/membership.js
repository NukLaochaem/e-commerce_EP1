module.exports = (sequelize, Sequelize) => {
  const Membership = sequelize.define("Membership", {
    name: Sequelize.DataTypes.STRING,
    purchaseCount: Sequelize.DataTypes.INTEGER,
    discount: Sequelize.DataTypes.FLOAT,
  });

  return Membership;
};
