const db = require("../models");
const GroupTask = db.taskGroup;

// Create and Save a new GroupTask
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a GroupTask
  const groupTask = new GroupTask({
    title: req.body.title,
    tasks: req.body.tasks,
  });

  // Save GroupTask in the database
  GroupTask.save(groupTask)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the GroupTask.",
      });
    });
};

// Retrieve all GroupTasks from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  GroupTask.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving groupTasks.",
      });
    });
};

// Find a single GroupTask with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  GroupTask.findById(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: "Not found GroupTask with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving GroupTask with id=" + id });
    });
};

// Update a GroupTask by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  GroupTask.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update GroupTask with id=${id}. Maybe GroupTask was not found!`,
        });
      } else res.send({ message: "GroupTask was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating GroupTask with id=" + id,
      });
    });
};

// Delete a GroupTask with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  GroupTask.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete GroupTask with id=${id}. Maybe GroupTask was not found!`,
        });
      } else {
        res.send({
          message: "GroupTask was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete GroupTask with id=" + id,
      });
    });
};

// Delete all GroupTasks from the database.
exports.deleteAll = (req, res) => {
  GroupTask.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} GroupTasks were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all groupTasks.",
      });
    });
};

// Find all done GroupTasks
exports.findAllDone = (req, res) => {
  GroupTask.find({ "tasks.done": true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving groupTasks.",
      });
    });
};

// Find all to do GroupTasks
exports.findAllToDo = (req, res) => {
  GroupTask.find({ "tasks.done": false })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving groupTasks.",
      });
    });
};
