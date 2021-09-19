module.exports = (sequelize, DataTypes) => {
  const Task = require("./Task.model");
  const User = require("./User.model");

  const TaskGroup = sequelize.define(
    "TaskGroup",
    {
      title: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "TaskGroup", // Set the table name
    }
  );

  return TaskGroup;
};
