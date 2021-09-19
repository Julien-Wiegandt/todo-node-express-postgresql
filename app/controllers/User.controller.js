const db = require("../models");
const User = db.User;
const Task = db.Task;
const Role = db.Role;
const TaskGroup = db.TaskGroup;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/auth.config");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Save User in the database
  Role.findOne({ where: { name: "User" } })
    .then((data) => {
      // Create a User
      const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        RoleId: data.dataValues.id,
      };

      User.create(user).then((data) => {
        res.status(201).send(data);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Some error occurred while creating the User.",
      });
    });
};

// Create and Save a new Admin user
exports.createAdmin = (email, password) => {
  // Validate request
  if (!email || !password) {
    console.log("Parameters cannot be empty");
    return;
  }

  // Save User in the database
  Role.findOne({ where: { name: "admin" } })
    .then((data) => {
      // Create a User
      const user = {
        email: email,
        password: bcrypt.hashSync(password, 8),
        role: data.id,
      };

      User.create(user).then((data) => {
        console.log("Admin created");
        return;
      });
    })
    .catch((err) => {
      console.log(err);
      console.log("Some error occurred while creating the User.");
    });
};

// Signin the User
exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        data.dataValues.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      let token = jwt.sign({ id: data.dataValues.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(201).send({
        id: data.dataValues.id,
        email: data.dataValues.email,
        role: data.dataValues.role,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      console.log(err);
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
    req.body.password = bcrypt.hashSync(req.body.password, 8);
  }
  const id = req.params.id;

  User.update(req.body, { where: { id: id } })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else {
        User.findByPk(id).then((user) => {
          res.send(user);
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({ where: { id: id }, cascade: true })
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({ id: id });
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
  User.destroy({ where: {}, cascade: true })
    .then((data) => {
      res.send({ deletedItems: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Some error occurred while removing all Users.",
      });
    });
};

// Find all TaskGroups for one User with his id
exports.findTaskGroupsForOneUser = (req, res) => {
  const id = req.params.id;

  TaskGroup.findAll({ where: { UserId: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Some error occurred while retrieving TaskGroups.",
      });
    });
};
