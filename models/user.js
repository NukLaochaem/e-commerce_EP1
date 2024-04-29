module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      FullName: Sequelize.DataTypes.STRING,
      FirstName: Sequelize.DataTypes.STRING,
      LastName: Sequelize.DataTypes.STRING,
      UserName: Sequelize.DataTypes.STRING,
      Password: Sequelize.DataTypes.STRING,
      Role: { type: Sequelize.DataTypes.STRING, defaultValue: "member" },
    },
    {
      timestamps: true,
    }
  );
  return User;
};
