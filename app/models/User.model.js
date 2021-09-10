const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    groups: [{ type: Schema.Types.ObjectId, ref: "TaskGroup" }],
  });
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("User", schema);
  return User;
};
