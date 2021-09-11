module.exports = (app) => {
  const task = require("../controllers/Task.controller.js");

  var router = require("express").Router();

  // Create a new Task
  /**
   * @swagger
   * /api/task:
   *  post:
   *    tags:
   *    - "Task"
   *    summary: Create a Task
   *    description: Create a Task
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
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
   *      '400':
   *        description: Wrong Task's body parameters/content
   *      '500':
   *        description: Internal Server Error
   */
  router.post("/", task.create);

  // Retrieve all Tasks
  /**
   * @swagger
   * /api/task:
   *  get:
   *    tags:
   *    - "Task"
   *    summary: Retrieve all Tasks
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
   *              title:
   *                type: "string"
   *              done:
   *                type: "boolean"
   *              id:
   *                type: "string"
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/", task.findAll);

  // Retrieve all to do Tasks
  /**
   * @swagger
   * /api/task/todo:
   *  get:
   *    tags:
   *    - "Task"
   *    summary: Retrieve all to do Tasks
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
   *              title:
   *                type: "string"
   *              done:
   *                type: "boolean"
   *              id:
   *                type: "string"
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/todo", task.findAllToDo);

  // Retrieve all done Tasks
  /**
   * @swagger
   * /api/task/done:
   *  get:
   *    tags:
   *    - "Task"
   *    summary: Retrieve all done Tasks
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
   *              title:
   *                type: "string"
   *              done:
   *                type: "boolean"
   *              id:
   *                type: "string"
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/done", task.findAllDone);

  // Retrieve a single Task with id
  /**
   * @swagger
   * /api/task/{taskId}:
   *  get:
   *    tags:
   *    - "Task"
   *    summary: Retrieve a single Task with id
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
   *            title:
   *              type: "string"
   *            done:
   *              type: "boolean"
   *            id:
   *              type: "string"
   *      '404':
   *        description: Task not found with id
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/:id", task.findOne);

  // Update a Task with id
  /**
   * @swagger
   * /api/task/{taskId}:
   *  put:
   *    tags:
   *    - "Task"
   *    summary: Update a Task
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
   *            title:
   *              type: "string"
   *            done:
   *              type: "boolean"
   *            id:
   *              type: "string"
   *      '400':
   *        description: Wrong Task's id or body parameters/content
   *      '500':
   *        description: Internal Server Error
   */
  router.put("/:id", task.update);

  // Delete a Task with id
  /**
   * @swagger
   * /api/task/{taskId}:
   *  delete:
   *    tags:
   *    - "Task"
   *    summary: Delete a Task
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
   *              type: "string"
   *      '404':
   *        description: Task not found
   *      '500':
   *        description: Internal Server Error
   */
  router.delete("/:id", task.delete);

  // Delete all Tasks
  /**
   * @swagger
   * /api/task:
   *  delete:
   *    tags:
   *    - "Task"
   *    summary: Delete all Tasks
   *    description: Delete all Tasks
   *    consumes: application/json
   *    produces: application/json
   *    responses:
   *      '200':
   *        description: Tasks successfully deleted
   *        schema:
   *          type: "object"
   *          properties:
   *            deletedCount:
   *              type: "integer"
   *      '500':
   *        description: Internal Server Error
   */
  router.delete("/", task.deleteAll);

  app.use("/api/task", router);
};
