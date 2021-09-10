module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
  });
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Task = mongoose.model("Task", schema);
  return Task;
};
