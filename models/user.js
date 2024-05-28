module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    firstName: Sequelize.DataTypes.STRING,
    lastName: Sequelize.DataTypes.STRING,
    userName: Sequelize.DataTypes.STRING,
    email: Sequelize.DataTypes.STRING,
    password: Sequelize.DataTypes.STRING,
    salt: Sequelize.DataTypes.STRING,
    address: Sequelize.DataTypes.STRING,
    telephoneNumber: Sequelize.DataTypes.STRING,
    purchaseCount: Sequelize.DataTypes.INTEGER,
  });
  User.associate = (models) => {
    User.belongsTo(models.Membership, { foreignKey: "MembershipId" });
    User.belongsTo(models.Role, { foreignKey: "RoleId" });
    User.hasOne(models.Cart, { foreignKey: "userId" });
    User.hasMany(models.Order, { foreignKey: "userId" });
  };

  return User;
};
