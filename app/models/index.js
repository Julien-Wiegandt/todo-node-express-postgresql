const dbConfig = require("../config/db.config.js");
const applyTableAssociations = require("./Associations");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  dialectOptions: {
    // Handle SSL OFF error
    ssl: {
      require: true,
      // Handle self signed certificate error
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Role = require("./Role.model.js")(sequelize, Sequelize);
db.Task = require("./Task.model.js")(sequelize, Sequelize);
db.TaskGroup = require("./TaskGroup.model.js")(sequelize, Sequelize);
db.User = require("./User.model.js")(sequelize, Sequelize);

applyTableAssociations;

module.exports = db;
