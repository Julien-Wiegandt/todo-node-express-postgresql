const db = require("../models");
const User = db.user;
const Task = db.task;
const TaskGroup = db.taskGroup;
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      // Create a User
      const user = new User({
        email: req.body.email,
        password: hash,
      });

      // Save User in the database
      user
        .save(user)
        .then((data) => {
          res.status(201).send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the User.",
          });
        });
    });
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  if (req.body.password) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        req.body.password = hash;
        const id = req.params.id;

        User.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
          .then((data) => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update User with id=${id}. Maybe User was not found!`,
              });
            } else res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating User with id=" + id,
            });
          });
      });
    });
  } else {
    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`,
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating User with id=" + id,
        });
      });
  }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        let taskIds = [];
        const taskGroupIds = data.taskGroups.map((taskGroup) => {
          const taskGroupId = taskGroup.toString();
          TaskGroup.findById(taskGroupId).then((taskGroup) => {
            const tasks = taskGroup.tasks.map((task) => task.toString());
            taskIds = taskIds.concat(tasks);
          });
          return taskGroupId;
        });
        TaskGroup.deleteMany({ _id: { $in: taskGroupIds } }).then((secondData) => {
          Task.deleteMany({ _id: { $in: taskIds } }).then((thirdData) => {
            res.send({
              id: data.id,
              deletedTaskGroupsCount: secondData.deletedCount,
              deletedTasksCount: thirdData.deletedCount,
            });
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((usersData) => {
      TaskGroup.deleteMany({}).then((taskGroupsData) => {
        Task.deleteMany({}).then((tasksData) => {
          res.send({
            detetedCount: usersData.deletedCount,
            deletedTaskGroupsCount: taskGroupsData.deletedCount,
            deletedTasksCount: tasksData.deletedCount,
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Users.",
      });
    });
};

// Find all TaskGroups for one User with his id
exports.findTaskGroupsForOneUser = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .populate("taskGroups")
    .then((data) => {
      if (!data) res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data.taskGroups);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving User with id=" + id });
    });
};
