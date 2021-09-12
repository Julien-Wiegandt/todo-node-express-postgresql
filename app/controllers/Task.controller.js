const db = require("../models");
const Task = db.task;
const TaskGroup = db.taskGroup;

// Create and Save a new Task in a existing TaskGroup
exports.create = (req, res) => {
  const taskGroupId = req.params.id;

  // Validate request
  if (!req.body.title || !taskGroupId) {
    res.status(400).send({ message: "Wrong parameters/body" });
    return;
  }

  // Create a Task
  const task = new Task({
    title: req.body.title,
    done: req.body.done,
  });

  // Save Task in the database
  task
    .save(task)
    .then((task) => {
      TaskGroup.findById(taskGroupId)
        .then((taskGroup) => {
          if (!taskGroup) {
            res
              .status(404)
              .send({ message: "Not found TaskGroup with id " + taskGroupId });
          } else {
            taskGroup.tasks.push(task);
            TaskGroup.findByIdAndUpdate(taskGroupId, taskGroup, {
              useFindAndModify: false,
              new: true,
            })
              .then((data) => {
                if (!data) {
                  res.status(404).send({
                    message: `Cannot update TaskGroup with id=${taskGroupId}. Maybe TaskGroup was not found!`,
                  });
                } else res.status(201).send(task);
              })
              .catch((err) => {
                res.status(500).send({
                  message: "Error updating TaskGroup with id=" + taskGroupId,
                });
              });
          }
        })
        .catch((err) => {
          res
            .status(500)
            .send({ message: "Error retrieving TaskGroup with id=" + taskGroupId });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Task.",
      });
    });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Task.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    });
};

// Find a single Task with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findById(id)
    .then((data) => {
      //It does 404 error just when a wrong "12 bytes" id is enter, ex : 0747a9ad467d4dc29ce70344
      if (!data) res.status(404).send({ message: "Not found Task with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Task with id=" + id });
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

  Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found!`,
        });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Task.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
        });
      } else {
        deleteTaskByIdInTaskGroups(id);
        res.send({
          id: data.id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id,
      });
    });
};

/**
 * @todo Fix the optimisation issue (loop on all groups)
 */
function deleteTaskByIdInTaskGroups(id) {
  TaskGroup.find()
    .then((data) => {
      data.map((taskGroup) => {
        const filteredTask = taskGroup.tasks.filter((task) => {
          return task._id.toString() !== id;
        });
        if (filteredTask.length !== taskGroup.tasks.length) {
          taskGroup.tasks = filteredTask;
          TaskGroup.findByIdAndUpdate(taskGroup.id, taskGroup, {
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

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
  Task.deleteMany({})
    .then((data) => {
      deleteAllTasksInTaskGroups();
      res.send({
        deletedCount: data.deletedCount,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all tasks.",
      });
    });
};

function deleteAllTasksInTaskGroups() {
  TaskGroup.find()
    .then((data) => {
      data.map((taskGroup) => {
        taskGroup.tasks = [];
        TaskGroup.findByIdAndUpdate(taskGroup.id, taskGroup, {
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

// Find all done Tasks
exports.findAllDone = (req, res) => {
  Task.find({ done: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    });
};

// Find all to do Tasks
exports.findAllToDo = (req, res) => {
  Task.find({ done: false })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    });
};
