module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    title: {
      type: Sequelize.STRING,
    },
    done: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    tableName: "Task", // Set the table name
  });

  return Task;
};
