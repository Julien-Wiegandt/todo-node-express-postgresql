module.exports = (app) => {
  const user = require("../controllers/User.controller.js");

  var router = require("express").Router();

  // Create a new User
  /**
   * @swagger
   * /api/user:
   *  post:
   *    tags:
   *    - "User"
   *    summary: Create a User
   *    description: Create a User
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - in: body
   *      name: body
   *      description: A User has a email, a password and TaskGroups (empty on creation)
   *      required: true
   *      schema:
   *        type: "object"
   *        required:
   *          - "email"
   *          - "password"
   *        properties:
   *          email:
   *            type: "string"
   *          password:
   *            type: "string"
   *    responses:
   *      '201':
   *        description: User successfully created
   *        schema:
   *          type: "object"
   *          properties:
   *            email:
   *              type: "string"
   *            password:
   *              type: "string"
   *            taskGroups:
   *              type: "array"
   *              items:
   *                type: "object"
   *                properties:
   *                  title:
   *                    type: "string"
   *                  tasks:
   *                    type: "array"
   *                    items:
   *                      type: "object"
   *                      properties:
   *                        title:
   *                          type: "string"
   *                        done:
   *                          type: "boolean"
   *                        id:
   *                          type: "string"
   *                  id:
   *                    type: "string"
   *            id:
   *              type: "string"
   *      '400':
   *        description: Wrong Task's body parameters/content
   *      '500':
   *        description: Internal Server Error
   */
  router.post("/", user.create);

  // Retrieve all Users
  router.get("/", user.findAll);

  // Retrieve a single User with id
  router.get("/:id", user.findOne);

  // Update a User with id
  router.put("/:id", user.update);

  // Delete a User with id
  router.delete("/:id", user.delete);

  // Create a new User
  router.delete("/", user.deleteAll);

  app.use("/api/user", router);
};
