const db = require("../models");
const Task = db.Task;

// Create and Save a new Task in a existing TaskGroup
exports.create = (req, res) => {
  const taskGroupId = req.params.id;

  // Validate request
  if (!req.body.title || !taskGroupId) {
    res.status(400).send({ message: "Wrong parameters/body" });
    return;
  }

  // Create a Task
  const task = {
    title: req.body.title,
    done: req.body.done,
    TaskGroupId: req.params.id,
  };

  // Save Task in the database
  Task.create(task)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Some error occurred while creating the task.",
      });
    });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
  Task.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Some error occurred while retrieving tasks.",
      });
    });
};

// Find a single Task with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findByPk(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: "Not found Task with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Some error occurred while retrieving the task.",
      });
    });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Task.update(req.body, { where: { id: id } })
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot update Task with id=${id}. Maybe 404 : Task was not found!`,
        });
      } else {
        Task.findByPk(id).then((data) => {
          res.send(data);
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({ where: { id: id } })
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
        });
      } else {
        res.send({ id: id });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete Task with id=" + id,
      });
    });
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
  Task.destroy({ where: {}, truncate: false })
    .then((data) => {
      res.send({ deletedItems: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Some error occurred while removing all Tasks.",
      });
    });
};

// Find all done Tasks
exports.findAllDone = (req, res) => {
  Task.findAll({ where: { done: true } })
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

// Find all to do Tasks
exports.findAllToDo = (req, res) => {
  Task.findAll({ where: { done: false } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    });
};
