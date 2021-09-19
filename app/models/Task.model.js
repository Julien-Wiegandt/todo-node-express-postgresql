module.exports = (sequelize, DataTypes) => {
  const TaskGroup = require("./TaskGroup.model");

  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tableName: "Task", // Set the table name
  });

  return Task;
};
