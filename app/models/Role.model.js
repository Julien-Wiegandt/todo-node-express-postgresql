module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    { tableName: "Role", timestamps: false } // Set the table name
  );

  return Role;
};
