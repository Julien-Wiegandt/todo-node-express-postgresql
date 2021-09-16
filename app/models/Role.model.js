module.exports = (mongoose) => {
  const Role = mongoose.model(
    "Role",
    new mongoose.Schema({
      name: String,
    })
  );
  return Role;
};
