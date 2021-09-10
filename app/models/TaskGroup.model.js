const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    title: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  });
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const TaskGroup = mongoose.model("TaskGroup", schema);
  return TaskGroup;
};
