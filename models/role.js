module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("Role", {
    name: Sequelize.DataTypes.STRING,
  });

  Role.associate = (models) => {
    Role.hasMany(models.User, { foreignKey: "RoleId" });
  };

  return Role;
};
