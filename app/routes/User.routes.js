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
  /**
   * @swagger
   * /api/user:
   *  get:
   *    tags:
   *    - "User"
   *    summary: Retrieve all Users
   *    description: Retrieve all Users
   *    consumes: application/json
   *    produces: application/json
   *    responses:
   *      '200':
   *        description: Users successfully retrieved
   *        schema:
   *          type: "array"
   *          items:
   *            type: "object"
   *            properties:
   *              email:
   *                type: "string"
   *              password:
   *                type: "string"
   *              taskGroups:
   *                type: "array"
   *                items:
   *                  type: "object"
   *                  properties:
   *                    title:
   *                      type: "string"
   *                    tasks:
   *                      type: "array"
   *                      items:
   *                        type: "object"
   *                        properties:
   *                          title:
   *                            type: "string"
   *                          done:
   *                            type: "boolean"
   *                          id:
   *                            type: "string"
   *                    id:
   *                      type: "string"
   *              id:
   *                type: "string"
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/", user.findAll);

  // Retrieve a single User with id
  /**
   * @swagger
   * /api/user/{userId}:
   *  get:
   *    tags:
   *    - "User"
   *    summary: Retrieve a single User with id
   *    description: Retrieve a single User with id
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "userId"
   *      in: "path"
   *      description: "ID of User to return"
   *      required: true
   *      type: "string"
   *    responses:
   *      '200':
   *        description: User successfully founded
   *        schema:
   *          type: "object"
   *          properties:
   *            email:
   *              type: "string"
   *            done:
   *              type: "boolean"
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
   *      '404':
   *        description: Task not found with id
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/:id", user.findOne);

  // Update a User with id
  /**
   * @swagger
   * /api/user/{userId}:
   *  put:
   *    tags:
   *    - "User"
   *    summary: Update a User
   *    description: Update a User
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "userId"
   *      in: "path"
   *      description: "ID of User to update"
   *      required: true
   *      type: "string"
   *    - in: body
   *      name: body
   *      description: A User has a email, a password and TaskGroups (cannot update this)
   *      required: true
   *      schema:
   *        type: "object"
   *        properties:
   *          email:
   *            type: "string"
   *          password:
   *            type: "string"
   *    responses:
   *      '200':
   *        description: User successfully updated
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
   *        description: Wrong User's id or body parameters/content
   *      '500':
   *        description: Internal Server Error
   */
  router.put("/:id", user.update);

  // Delete a User with id
  /**
   * @swagger
   * /api/user/{userId}:
   *  delete:
   *    tags:
   *    - "User"
   *    summary: Delete a User
   *    description: Delete a User
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "userId"
   *      in: "path"
   *      description: "ID of User to delete"
   *      required: true
   *      type: "string"
   *    responses:
   *      '200':
   *        description: User successfully deleted
   *        schema:
   *          type: "object"
   *          properties:
   *            id:
   *              type: "string"
   *      '404':
   *        description: User not found
   *      '500':
   *        description: Internal Server Error
   */
  router.delete("/:id", user.delete);

  // Delete all Users
  /**
   * @swagger
   * /api/user:
   *  delete:
   *    tags:
   *    - "User"
   *    summary: Delete all Users
   *    description: Delete all Users
   *    consumes: application/json
   *    produces: application/json
   *    responses:
   *      '200':
   *        description: Users successfully deleted
   *        schema:
   *          type: "object"
   *          properties:
   *            deletedCount:
   *              type: "integer"
   *      '500':
   *        description: Internal Server Error
   */
  router.delete("/", user.deleteAll);

  // Retrieve all TaskGroups for one User with id
  /**
   * @swagger
   * /api/user/{userId}/task-groups:
   *  get:
   *    tags:
   *    - "User"
   *    summary: Retrieve all TaskGroups for one User User with id
   *    description: Retrieve all TaskGroups for one User with id
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "userId"
   *      in: "path"
   *      description: "ID of User"
   *      required: true
   *      type: "string"
   *    responses:
   *      '200':
   *        description: User's Taskgroups successfully founded
   *        schema:
   *          type: "array"
   *          items:
   *            type: "object"
   *            properties:
   *              title:
   *                type: "string"
   *              tasks:
   *                type: "array"
   *                items:
   *                  type: "object"
   *                  properties:
   *                    title:
   *                      type: "string"
   *                    done:
   *                      type: "boolean"
   *                    id:
   *                      type: "string"
   *              id:
   *                type: "string"
   *      '404':
   *        description: Task not found with id
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/:id/task-groups", user.findTaskGroupsForOneUser);

  app.use("/api/user", router);
};
