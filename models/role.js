module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("Role", {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Role;
};
