module.exports = (sequelize, Sequelize) => {
  const TaskGroup = require("./TaskGroup.model");
  const Role = require("./Role.model");
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    tableName: "User", // Set the table name
  });

  User.hasMany(TaskGroup, { as: "taskGroups" });
  TaskGroup.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  User.hasOne(Role, { as: "role" });

  return User;
};
