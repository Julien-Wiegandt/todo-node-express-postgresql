const db = require("../models");
const TaskGroup = db.TaskGroup;
const Task = db.Task;
const User = db.User;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

// Create and Save a new TaskGroup
exports.create = (req, res) => {
  const id = req.params.id;

  // Validate request
  if (!req.body.title || !id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a TaskGroup
  const taskGroup = {
    title: req.body.title,
    UserId: req.params.id,
  };

  let token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, config.secret);
  let userId = decoded.id;
  if (userId == id) {
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
  } else {
    res
      .status(403)
      .send({ message: "You are trying to access a resource that is not yours." });
  }
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
      else {
        let token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, config.secret);
        let userId = decoded.id;
        if (userId == data.UserId) {
          res.send(data);
        } else {
          res
            .status(403)
            .send({ message: "You are trying to access a resource that is not yours." });
        }
      }
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

  TaskGroup.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update TaskGroup with id=${id}. Maybe TaskGroup was not found!`,
        });
      }
      let token = req.headers["x-access-token"];
      const decoded = jwt.verify(token, config.secret);
      let userId = decoded.id;
      if (userId == data.UserId) {
        TaskGroup.update(req.body, { where: { id: id } })
          .then((data) => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update TaskGroup with id=${id}. Maybe TaskGroup was not found!`,
              });
            } else {
              TaskGroup.findByPk(id).then((data) => {
                res.send(data);
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message: "Error updating TaskGroup with id=" + id,
            });
          });
      } else {
        res
          .status(403)
          .send({ message: "You are trying to access a resource that is not yours." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({
        message: `Cannot update TaskGroup with id=${id}. Maybe TaskGroup was not found!`,
      });
    });
};

// Delete a TaskGroup with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  TaskGroup.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete TaskGroup with id=${id}. Maybe TaskGroup was not found!`,
        });
      }
      let token = req.headers["x-access-token"];
      const decoded = jwt.verify(token, config.secret);
      let userId = decoded.id;
      if (userId == data.UserId) {
        TaskGroup.destroy({ where: { id: id }, cascade: true })
          .then((data) => {
            if (!data) {
              res.status(400).send({
                message: `Cannot delete TaskGroup with id=${id}. Maybe 404 : TaskGroup was not found!`,
              });
            } else {
              res.send({ id: id });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message: "Could not delete TaskGroup with id=" + id,
            });
          });
      } else {
        res
          .status(403)
          .send({ message: "You are trying to access a resource that is not yours." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({
        message: `Cannot delete TaskGroup with id=${id}. Maybe TaskGroup was not found!`,
      });
    });
};

// Delete all TaskGroups from the database.
exports.deleteAll = (req, res) => {
  TaskGroup.destroy({ where: {}, cascade: true })
    .then((data) => {
      res.send({ deletedItems: data });
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

  TaskGroup.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `TaskGroup was not found!`,
        });
      }
      let token = req.headers["x-access-token"];
      const decoded = jwt.verify(token, config.secret);
      let userId = decoded.id;
      if (userId == data.UserId) {
        Task.findAll({ where: { TaskGroupId: id, done: true } })
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message: "Some error occurred while retrieving Tasks.",
            });
          });
      } else {
        res
          .status(403)
          .send({ message: "You are trying to access a resource that is not yours." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({
        message: `TaskGroup was not found!`,
      });
    });
};

// Find all to do TaskGroups
exports.findAllToDo = (req, res) => {
  const id = req.params.id;

  TaskGroup.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `TaskGroup was not found!`,
        });
      }
      let token = req.headers["x-access-token"];
      const decoded = jwt.verify(token, config.secret);
      let userId = decoded.id;
      if (userId == data.UserId) {
        Task.findAll({ where: { TaskGroupId: id, done: false } })
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message: "Some error occurred while retrieving Tasks.",
            });
          });
      } else {
        res
          .status(403)
          .send({ message: "You are trying to access a resource that is not yours." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({
        message: `TaskGroup was not found!`,
      });
    });
};

// Find all tasks for one TaskGroup
exports.findAllTasksByTaskGroupId = (req, res) => {
  const id = req.params.id;

  TaskGroup.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `TaskGroup was not found!`,
        });
      }
      let token = req.headers["x-access-token"];
      const decoded = jwt.verify(token, config.secret);
      let userId = decoded.id;
      if (userId == data.UserId) {
        Task.findAll({ where: { TaskGroupId: id } })
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message: "Some error occurred while retrieving Tasks.",
            });
          });
      } else {
        res
          .status(403)
          .send({ message: "You are trying to access a resource that is not yours." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({
        message: `TaskGroup was not found!`,
      });
    });
};
