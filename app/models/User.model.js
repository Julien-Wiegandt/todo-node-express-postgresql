module.exports = (sequelize, DataTypes) => {
  const TaskGroup = require("./TaskGroup.model");
  const Role = require("./Role.model");
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    tableName: "User", // Set the table name
  });

  return User;
};
