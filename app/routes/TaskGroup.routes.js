module.exports = (app) => {
  const taskGroup = require("../controllers/TaskGroup.controller.js");

  var router = require("express").Router();

  // Create a new TaskGroup
  router.post("/", taskGroup.create);

  // Retrieve all TaskGroups
  router.get("/", taskGroup.findAll);

  // Retrieve all to do TaskGroups
  router.get("/todo", taskGroup.findAllToDo);

  // Retrieve all done TaskGroups
  router.get("/done", taskGroup.findAllDone);

  // Retrieve a single TaskGroup with id
  router.get("/:id", taskGroup.findOne);

  // Update a TaskGroup with id
  router.put("/:id", taskGroup.update);

  // Delete a TaskGroup with id
  router.delete("/:id", taskGroup.delete);

  // Create a new TaskGroup
  router.delete("/", taskGroup.deleteAll);

  app.use("/api/task-group", router);
};
