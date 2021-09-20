module.exports = (app) => {
  const task = require("../controllers/Task.controller.js");

  const { authJwt } = require("../middlewares");

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  // Create a new Task
  /**
   * @swagger
   * /api/task/{taskGroupId}:
   *  post:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "Task 3.0"
   *    summary: Create a Task [UserAccess]
   *    description: Create a Task
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "taskGroupId"
   *      in: "path"
   *      description: "ID of Task's TaskGroup"
   *      required: true
   *      type: "string"
   *    - in: body
   *      name: body
   *      description: A Task has a title and a "done" status
   *      required: true
   *      schema:
   *        type: "object"
   *        required:
   *          - "title"
   *        properties:
   *          title:
   *            type: "string"
   *          done:
   *            type: "boolean"
   *            default: false
   *    responses:
   *      '201':
   *        description: Task successfully created
   *        schema:
   *          type: "object"
   *          properties:
   *            id:
   *              type: "integer"
   *            title:
   *              type: "string"
   *            done:
   *              type: boolean
   *      '400':
   *        description: Wrong Task's body parameters/content
   *      '403':
   *        description: Unauthorized
   *      '500':
   *        description: Internal Server Error
   */
  router.post("/:id", [authJwt.verifyToken], task.create);

  // Retrieve all Tasks
  /**
   * @swagger
   * /api/task:
   *  get:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "Task 3.0"
   *    summary: Retrieve all Tasks [AdminAccess]
   *    description: Retrieve all Tasks
   *    consumes: application/json
   *    produces: application/json
   *    responses:
   *      '200':
   *        description: Tasks successfully retrieved
   *        schema:
   *          type: "array"
   *          items:
   *            type: "object"
   *            properties:
   *              id:
   *                type: "integer"
   *              title:
   *                type: "string"
   *              done:
   *                type: "boolean"
   *              TaskGroupid:
   *                type: "integer"
   *      '403':
   *        description: Unauthorized
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/", [authJwt.verifyToken, authJwt.isAdmin], task.findAll);

  // Retrieve all to do Tasks
  /**
   * @swagger
   * /api/task/todo:
   *  get:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "Task 3.0"
   *    summary: Retrieve all to do Tasks [AdminAccess]
   *    description: Retrieve all to do Tasks
   *    consumes: application/json
   *    produces: application/json
   *    responses:
   *      '200':
   *        description: To do Tasks successfully retrieved
   *        schema:
   *          type: "array"
   *          items:
   *            type: "object"
   *            properties:
   *              id:
   *                type: "integer"
   *              title:
   *                type: "string"
   *              done:
   *                type: "boolean"
   *              TaskGroupid:
   *                type: "integer"
   *      '403':
   *        description: Unauthorized
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/todo", [authJwt.verifyToken, authJwt.isAdmin], task.findAllToDo);

  // Retrieve all done Tasks
  /**
   * @swagger
   * /api/task/done:
   *  get:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "Task 3.0"
   *    summary: Retrieve all done Tasks [AdminAccess]
   *    description: Retrieve all done Tasks
   *    consumes: application/json
   *    produces: application/json
   *    responses:
   *      '200':
   *        description: Done Tasks successfully retrieved
   *        schema:
   *          type: "array"
   *          items:
   *            type: "object"
   *            properties:
   *              id:
   *                type: "integer"
   *              title:
   *                type: "string"
   *              done:
   *                type: "boolean"
   *              TaskGroupid:
   *                type: "integer"
   *      '403':
   *        description: Unauthorized
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/done", [authJwt.verifyToken, authJwt.isAdmin], task.findAllDone);

  // Retrieve a single Task with id
  /**
   * @swagger
   * /api/task/{taskId}:
   *  get:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "Task 3.0"
   *    summary: Retrieve a single Task with id [UserAccess]
   *    description: Retrieve a single Task with id
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "taskId"
   *      in: "path"
   *      description: "ID of Task to return"
   *      required: true
   *      type: "string"
   *    responses:
   *      '200':
   *        description: Task successfully founded
   *        schema:
   *          type: "object"
   *          properties:
   *            id:
   *              type: "integer"
   *            title:
   *              type: "string"
   *            done:
   *              type: "boolean"
   *            TaskGroupid:
   *                type: "integer"
   *      '403':
   *        description: Unauthorized
   *      '404':
   *        description: Task not found with id
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/:id", [authJwt.verifyToken], task.findOne);

  // Update a Task with id
  /**
   * @swagger
   * /api/task/{taskId}:
   *  put:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "Task 3.0"
   *    summary: Update a Task [UserAccess]
   *    description: Update a Task
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "taskId"
   *      in: "path"
   *      description: "ID of Task to update"
   *      required: true
   *      type: "string"
   *    - in: body
   *      name: body
   *      description: A Task has a title and a "done" status
   *      required: true
   *      schema:
   *        type: "object"
   *        properties:
   *          title:
   *            type: "string"
   *          done:
   *            type: "boolean"
   *    responses:
   *      '200':
   *        description: Task successfully updated
   *        schema:
   *          type: "object"
   *          properties:
   *            id:
   *              type: "integer"
   *            title:
   *              type: "string"
   *            done:
   *              type: "boolean"
   *            TaskGroupid:
   *              type: "integer"
   *      '400':
   *        description: Wrong Task's id or body parameters/content
   *      '403':
   *        description: Unauthorized
   *      '500':
   *        description: Internal Server Error
   */
  router.put("/:id", [authJwt.verifyToken], task.update);

  // Delete a Task with id
  /**
   * @swagger
   * /api/task/{taskId}:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "Task 3.0"
   *    summary: Delete a Task [UserAccess]
   *    description: Delete a Task
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "taskId"
   *      in: "path"
   *      description: "ID of Task to delete"
   *      required: true
   *      type: "string"
   *    responses:
   *      '200':
   *        description: Task successfully deleted
   *        schema:
   *          type: "object"
   *          properties:
   *            id:
   *              type: "integer"
   *      '403':
   *        description: Unauthorized
   *      '404':
   *        description: Task not found
   *      '500':
   *        description: Internal Server Error
   */
  router.delete("/:id", [authJwt.verifyToken], task.delete);

  // Delete all Tasks
  /**
   * @swagger
   * /api/task:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "Task 3.0"
   *    summary: Delete all Tasks [AdminAccess]
   *    description: Delete all Tasks
   *    consumes: application/json
   *    produces: application/json
   *    responses:
   *      '200':
   *        description: Tasks successfully deleted
   *        schema:
   *          type: "object"
   *          properties:
   *            deletedItems:
   *              type: "integer"
   *      '403':
   *        description: Unauthorized
   *      '500':
   *        description: Internal Server Error
   */
  router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], task.deleteAll);

  app.use("/api/task", router);
};
