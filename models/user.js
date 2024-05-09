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
    role: {
      type: Sequelize.DataTypes.STRING,
      defaultValue: "user",
    },
    membershipStatus: {
      type: Sequelize.DataTypes.STRING,
      defaultValue: "Bronze",
    },
  });
  User.associate = (models) => {
    User.belongsTo(models.Membership);
    User.belongsTo(models.Role);
    User.belongsTo(models.Cart);
    User.belongsTo(models.Order);
  };

  return User;
};
