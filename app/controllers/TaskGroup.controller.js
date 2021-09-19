const db = require("../models");
const TaskGroup = db.TaskGroup;
const Task = db.Task;
const User = db.User;

// Create and Save a new TaskGroup
exports.create = (req, res) => {
  const userId = req.params.id;

  // Validate request
  if (!req.body.title || !userId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a TaskGroup
  const taskGroup = {
    title: req.body.title,
    userId: req.params.id,
  };

  // Save TaskGroup in the database
  TaskGroup.create(taskGroup)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while creating the taskGroup." });
    });
};

// Retrieve all TaskGroups from the database.
exports.findAll = (req, res) => {
  TaskGroup.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Some error occurred while retrieving taskGroups.",
      });
    });
};

// Find a single TaskGroup with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  TaskGroup.findByPk(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: "Not found TaskGroup with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error retrieving TaskGroup with id=" + id });
    });
};

// Update a TaskGroup by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  TaskGroup.update(req.body, { where: { id: id } })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update TaskGroup with id=${id}. Maybe TaskGroup was not found!`,
        });
      } else res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating TaskGroup with id=" + id,
      });
    });
};

// Delete a TaskGroup with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  TaskGroup.destroy({ where: { id: id }, cascade: true })
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot delete TaskGroup with id=${id}. Maybe 404 : TaskGroup was not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete TaskGroup with id=" + id,
      });
    });
};

// Delete all TaskGroups from the database.
exports.deleteAll = (req, res) => {
  TaskGroup.destroy({ where: {}, cascade: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Some error occurred while removing all TaskGroups.",
      });
    });
};

// Find all done TaskGroups
exports.findAllDone = (req, res) => {
  const id = req.params.id;

  Task.findAll({ where: { taskGroupId: id, done: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Some error occurred while retrieving Tasks.",
      });
    });
};

// Find all to do TaskGroups
exports.findAllToDo = (req, res) => {
  const id = req.params.id;

  Task.findAll({ where: { taskGroupId: id, done: false } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Some error occurred while retrieving Tasks.",
      });
    });
};

// Find all tasks for one TaskGroup
exports.findAllTasksByTaskGroupId = (req, res) => {
  const id = req.params.id;

  Task.findAll({ where: { taskGroupId: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Some error occurred while retrieving Tasks.",
      });
    });
};
