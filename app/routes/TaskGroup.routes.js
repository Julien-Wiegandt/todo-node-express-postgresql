module.exports = (app) => {
  const taskGroup = require("../controllers/TaskGroup.controller.js");

  var router = require("express").Router();

  // Create a new TaskGroup
  /**
   * @swagger
   * /api/task-group:
   *  post:
   *    tags:
   *    - "TaskGroup"
   *    summary: Create a TaskGroup
   *    description: Create a TaskGroup
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - in: body
   *      name: body
   *      description: A TaskGroup has a title and tasks (no tasks at the creation)
   *      required: true
   *      schema:
   *        type: "object"
   *        required:
   *          - "title"
   *        properties:
   *          title:
   *            type: "string"
   *    responses:
   *      '201':
   *        description: TaskGroup successfully created
   *      '400':
   *        description: Wrong TaskGroup's body parameters/content
   *      '500':
   *        description: Internal Server Error
   */
  router.post("/", taskGroup.create);

  // Retrieve all TaskGroups
  /**
   * @swagger
   * /api/task-group:
   *  get:
   *    tags:
   *    - "TaskGroup"
   *    summary: Retrieve all TaskGroups
   *    description: Retrieve all TaskGroups
   *    consumes: application/json
   *    produces: application/json
   *    responses:
   *      '200':
   *        description: TaskGroups successfully retrieved
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
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/", taskGroup.findAll);

  // Retrieve all to do TaskGroups
  /**
   * @swagger
   * /api/task-group/{taskGroupId}/todo:
   *  get:
   *    tags:
   *    - "TaskGroup"
   *    summary: Retrieve all to do Tasks in a TaskGroup
   *    description: Retrieve all to do Tasks in a TaskGroup
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "taskGroupId"
   *      in: "path"
   *      description: "ID of Tasks's TaskGroup to return"
   *    responses:
   *      '200':
   *        description: To do Tasks in the TaskGroup successfully retrieved
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
   *      '404':
   *        description: TaskGroup not found with id
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/:id/todo", taskGroup.findAllToDo);

  // Retrieve all done Tasks in a TaskGroup
  /**
   * @swagger
   * /api/task-group/{taskGroupId}/done:
   *  get:
   *    tags:
   *    - "TaskGroup"
   *    summary: Retrieve all done Tasks in a TaskGroup
   *    description: Retrieve all done Tasks in a TaskGroup
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "taskGroupId"
   *      in: "path"
   *      description: "ID of Tasks's TaskGroup to return"
   *    responses:
   *      '200':
   *        description: Done Tasks in the TaskGroup successfully retrieved
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
   *      '404':
   *        description: TaskGroup not found with id
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/:id/done", taskGroup.findAllDone);

  // Retrieve a single TaskGroup with id
  /**
   * @swagger
   * /api/task-group/{taskGroupId}:
   *  get:
   *    tags:
   *    - "TaskGroup"
   *    summary: Retrieve a single TaskGroup with id
   *    description: Retrieve a single TaskGroup with id
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "taskGroupId"
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
   *            tasks:
   *              type: "array"
   *              items:
   *                type: "object"
   *                properties:
   *                  title:
   *                    type: "string"
   *                  done:
   *                    type: "boolean"
   *                  id:
   *                    type: "string"
   *            id:
   *              type: "string"
   *      '404':
   *        description: TaskGroup not found with id
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/:id", taskGroup.findOne);

  // Update a TaskGroup with id
  /**
   * @swagger
   * /api/task-group/{taskGroupId}:
   *  put:
   *    tags:
   *    - "TaskGroup"
   *    summary: Update a TaskGroup
   *    description: Update a TaskGroup
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "taskGroupId"
   *      in: "path"
   *      description: "ID of TaskGroup to update"
   *      required: true
   *      type: "string"
   *    - in: body
   *      name: body
   *      description: A TaskGroup has a title and tasks (to update with Task routes)
   *      required: true
   *      schema:
   *        type: "object"
   *        properties:
   *          title:
   *            type: "string"
   *    responses:
   *      '200':
   *        description: TaskGroup successfully updated
   *        schema:
   *          type: "object"
   *          properties:
   *            title:
   *              type: "string"
   *            tasks:
   *              type: "array"
   *              items:
   *                type: "object"
   *                properties:
   *                  title:
   *                    type: "string"
   *                  done:
   *                    type: "boolean"
   *                  id:
   *                    type: "string"
   *            id:
   *              type: "string"
   *      '400':
   *        description: Wrong TaskGroup's id or body parameters/content
   *      '500':
   *        description: Internal Server Error
   */
  router.put("/:id", taskGroup.update);

  // Delete a TaskGroup with id
  /**
   * @swagger
   * /api/task-group/{taskGroupId}:
   *  delete:
   *    tags:
   *    - "TaskGroup"
   *    summary: Delete a TaskGroup
   *    description: Delete a TaskGroup
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "taskGroupId"
   *      in: "path"
   *      description: "ID of TaskGroup to delete"
   *      required: true
   *      type: "string"
   *    responses:
   *      '200':
   *        description: TaskGroup successfully deleted
   *        schema:
   *          type: "object"
   *          properties:
   *            id:
   *              type: "string"
   *      '404':
   *        description: TaskGroup not found
   *      '500':
   *        description: Internal Server Error
   */
  router.delete("/:id", taskGroup.delete);

  // Delete all TaskGroups
  /**
   * @swagger
   * /api/task-group:
   *  delete:
   *    tags:
   *    - "TaskGroup"
   *    summary: Delete all TaskGroups
   *    description: Delete all TaskGroups
   *    consumes: application/json
   *    produces: application/json
   *    responses:
   *      '200':
   *        description: TaskGroups successfully deleted
   *        schema:
   *          type: "object"
   *          properties:
   *            deletedCount:
   *              type: "integer"
   *      '500':
   *        description: Internal Server Error
   */
  router.delete("/", taskGroup.deleteAll);

  // Add a task to a TaskGroup
  /**
   * @swagger
   * /api/task-group/{taskGroupId}/task/{taskId}:
   *  put:
   *    tags:
   *    - "TaskGroup"
   *    summary: Add a task to a TaskGroup
   *    description:  Add a task to a TaskGroup
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "taskGroupId"
   *      in: "path"
   *      description: "ID of TaskGroup to update"
   *      required: true
   *      type: "string"
   *    - name: "taskId"
   *      in: "path"
   *      description: "ID of Task to add"
   *      required: true
   *      type: "string"
   *    responses:
   *      '200':
   *        description: Task successfully added to TaskGroup
   *        schema:
   *          type: "object"
   *          properties:
   *            title:
   *              type: "string"
   *            tasks:
   *              type: "array"
   *              items:
   *                type: "object"
   *                properties:
   *                  title:
   *                    type: "string"
   *                  done:
   *                    type: "boolean"
   *                  id:
   *                    type: "string"
   *            id:
   *              type: "string"
   *      '400':
   *        description: Wrong TaskGroup or Task id
   *      '404':
   *        description: TaskGroup or Task not fouded with specified ids
   *      '500':
   *        description: Internal Server Error
   */
  router.put("/:taskGroupId/task/:taskId", taskGroup.addTask);

  app.use("/api/task-group", router);
};
