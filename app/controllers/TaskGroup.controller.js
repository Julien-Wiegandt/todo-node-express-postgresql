const db = require("../models");
const TaskGroup = db.taskGroup;
const Task = db.task;
const User = db.user;

// Create and Save a new TaskGroup
exports.create = (req, res) => {
  const userId = req.params.id;

  // Validate request
  if (!req.body.title || !userId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a TaskGroup
  const taskGroup = new TaskGroup({
    title: req.body.title,
  });

  // Save TaskGroup in the database
  taskGroup
    .save(taskGroup)
    .then((taskGroup) => {
      User.findById(userId).then((user) => {
        if (!user) {
          res.status(404).send({ message: "Not found User with id " + userId });
        } else {
          user.taskGroups.push(taskGroup);
          User.findByIdAndUpdate(userId, user, {
            useFindAndModify: false,
            new: true,
          })
            .then((data) => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update User with id=${userId}. Maybe TaskGroup was not found!`,
                });
              } else res.status(201).send(taskGroup);
            })
            .catch((err) => {
              res.status(500).send({
                message: "Error updating TaskGroup with id=" + userId,
              });
            });
        }
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the TaskGroup.",
      });
    });
};

// Retrieve all TaskGroups from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  TaskGroup.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving TaskGroups.",
      });
    });
};

// Find a single TaskGroup with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  TaskGroup.findById(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: "Not found TaskGroup with id " + id });
      else res.send(data);
    })
    .catch((err) => {
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

  TaskGroup.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
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

  TaskGroup.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete TaskGroup with id=${id}. Maybe TaskGroup was not found!`,
        });
      } else {
        deleteTaskGroupByIdInUser(id);
        const tasks = data.tasks.map((task) => task.toString());
        Task.deleteMany({ _id: { $in: tasks } }).then((secondData) => {
          res.send({
            id: data.id,
            deletedTasksCount: secondData.deletedCount,
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete TaskGroup with id=" + id,
      });
    });
};

/**
 * @todo Fix the optimisation issue (loop on all groups)
 */
function deleteTaskGroupByIdInUser(id) {
  User.find()
    .then((data) => {
      data.map((user) => {
        const filteredTaskGroups = user.taskGroups.filter((taskGroup) => {
          return taskGroup._id.toString() !== id;
        });
        if (filteredTaskGroups.length !== user.taskGroups.length) {
          user.taskGroups = filteredTaskGroups;
          User.findByIdAndUpdate(user.id, user, {
            useFindAndModify: false,
            new: true,
          })
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// Delete all TaskGroups from the database.
exports.deleteAll = (req, res) => {
  TaskGroup.find()
    .then((firstData) => {
      let tasks = [];
      firstData.map((taskGroup) => {
        tasks = tasks.concat(taskGroup.tasks.map((task) => task.toString()));
      });
      TaskGroup.deleteMany({}).then((data) => {
        Task.deleteMany({ _id: { $in: tasks } }).then((secondData) => {
          deleteAllTaskGroupsInUsers();
          res.send({
            deletedTaskGroupsCount: data.deletedCount,
            deletedTasksCount: secondData.deletedCount,
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all TaskGroups.",
      });
    });
};

function deleteAllTaskGroupsInUsers() {
  User.find()
    .then((data) => {
      data.map((user) => {
        user.taskGroups = [];
        User.findByIdAndUpdate(user.id, user, {
          useFindAndModify: false,
          new: true,
        })
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// Find all done TaskGroups
exports.findAllDone = (req, res) => {
  const id = req.params.id;

  TaskGroup.findById(id)
    .populate("tasks")
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found TaskGroup with id " + id });
      } else {
        const tasks = data.tasks;
        const doneTasks = tasks.filter((task) => {
          return task.done === true;
        });
        res.send(doneTasks);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error retrieving TaskGroup with id=" + id });
    });
};

// Find all to do TaskGroups
exports.findAllToDo = (req, res) => {
  const id = req.params.id;

  TaskGroup.findById(id)
    .populate("tasks")
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found TaskGroup with id " + id });
      } else {
        let toDoTasks = [];
        const tasks = data.tasks;

        tasks.map((task) => {
          if (task.done === false) {
            toDoTasks.push(task);
          }
        });

        res.send(toDoTasks);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving TaskGroup with id=" + id });
    });
};

// Find all tasks for one TaskGroup
exports.findAllTasksByTaskGroupId = (req, res) => {
  const id = req.params.id;

  TaskGroup.findById(id)
    .populate("tasks")
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found TaskGroup with id " + id });
      } else {
        res.send(data.tasks);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error retrieving TaskGroup with id=" + id });
    });
};
