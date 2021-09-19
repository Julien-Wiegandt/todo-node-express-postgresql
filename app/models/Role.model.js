module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("role", {
    name: {
      type: Sequelize.STRING,
    },
    tableName: "Role", // Set the table name
  });

  return Role;
};
