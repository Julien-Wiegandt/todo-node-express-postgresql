module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    name: {
      type: DataTypes.STRING,
    },
    tableName: "Role", // Set the table name
  });

  return Role;
};
