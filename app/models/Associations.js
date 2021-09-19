const { sequelize } = require("sequelize");

exports.applyTableAssociations = () => {
  const { Role, Task, TaskGroup, User } = sequelize.models;

  Task.belongsTo(TaskGroup, {
    foreignKey: "taskGroupId",
    as: "taskGroup",
  });

  TaskGroup.hasMany(Task, { as: "tasks" });

  TaskGroup.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  User.hasMany(TaskGroup, { as: "taskGroups" });

  User.hasOne(Role, { as: "role" });
};
