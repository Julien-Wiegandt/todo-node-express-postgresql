module.exports = (sequelize, Sequelize) => {
  const Task = require("./Task.model");
  const TaskGroup = sequelize.define("taskGroup", {
    title: {
      type: Sequelize.STRING,
    },
    tableName: "TaskGroup", // Set the table name
  });

  TaskGroup.hasMany(Task, { as: "tasks" });
  Task.belongsTo(TaskGroup, {
    foreignKey: "taskGroupId",
    as: "taskGroup",
  });

  return TaskGroup;
};
