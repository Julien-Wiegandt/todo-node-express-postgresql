module.exports = (app) => {
  const taskGroup = require("../controllers/TaskGroup.controller.js");

  var router = require("express").Router();

  // Create a new TaskGroup
  /**
   * @swagger
   * /api/task-group/{userId}:
   *  post:
   *    tags:
   *    - "TaskGroup 2.0"
   *    summary: Create a TaskGroup
   *    description: Create a TaskGroup
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "userId"
   *      in: "path"
   *      description: "ID of Task's TaskGroup"
   *      required: true
   *      type: "string"
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
  router.post("/:id", taskGroup.create);

  // Retrieve all TaskGroups
  /**
   * @swagger
   * /api/task-group:
   *  get:
   *    tags:
   *    - "TaskGroup 2.0"
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
   *    - "TaskGroup 2.0"
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
   *    - "TaskGroup 2.0"
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

  // Retrieve all done Tasks in a TaskGroup
  /**
   * @swagger
   * /api/task-group/{taskGroupId}/tasks:
   *  get:
   *    tags:
   *    - "TaskGroup 2.0"
   *    summary: Retrieve all Tasks in a TaskGroup
   *    description: Retrieve all Tasks in a TaskGroup
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "taskGroupId"
   *      in: "path"
   *      description: "ID of Tasks's TaskGroup to return"
   *    responses:
   *      '200':
   *        description: Tasks in the TaskGroup successfully retrieved
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
  router.get("/:id/tasks", taskGroup.findAllTasksByTaskGroupId);

  // Retrieve a single TaskGroup with id
  /**
   * @swagger
   * /api/task-group/{taskGroupId}:
   *  get:
   *    tags:
   *    - "TaskGroup 2.0"
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
   *    - "TaskGroup 2.0"
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
   *    - "TaskGroup 2.0"
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
   *            deletedTasksCount:
   *              type: "integer"
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
   *    - "TaskGroup 2.0"
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

  app.use("/api/task-group", router);
};
