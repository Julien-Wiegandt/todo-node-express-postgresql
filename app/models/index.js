const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.task = require("./Task.model.js")(mongoose);
db.taskGroup = require("./TaskGroup.model.js")(mongoose);
db.user = require("./User.model.js")(mongoose);

module.exports = db;
