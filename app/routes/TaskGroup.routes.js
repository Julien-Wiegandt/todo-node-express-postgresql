module.exports = (app) => {
  const taskGroup = require("../controllers/TaskGroup.controller.js");

  const { authJwt } = require("../middlewares");

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  // Create a new TaskGroup
  /**
   * @swagger
   * /api/task-group/{userId}:
   *  post:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "TaskGroup"
   *    summary: Create a TaskGroup [UserAccess]
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
   *        schema:
   *          type: "object"
   *          properties:
   *            id:
   *              type: "integer"
   *            title:
   *              type: "string"
   *            UserId:
   *              type: "integer"
   *      '400':
   *        description: Wrong TaskGroup's body parameters/content
   *      '403':
   *        description: Unauthorized
   *      '500':
   *        description: Internal Server Error
   */
  router.post("/:id", [authJwt.verifyToken], taskGroup.create);

  // Retrieve all TaskGroups
  /**
   * @swagger
   * /api/task-group:
   *  get:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "TaskGroup"
   *    summary: Retrieve all TaskGroups [AdminAccess]
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
   *              id:
   *                type: "string"
   *              title:
   *                type: "string"
   *              UserId:
   *                type: "string"
   *      '403':
   *        description: Unauthorized
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/", [authJwt.verifyToken, authJwt.isAdmin], taskGroup.findAll);

  // Retrieve all Tasks in a TaskGroup
  /**
   * @swagger
   * /api/task-group/{taskGroupId}/tasks:
   *  get:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "TaskGroup"
   *    summary: Retrieve all Tasks in a TaskGroup [UserAccess]
   *    description: Retrieve all Tasks in a TaskGroup
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - name: "taskGroupId"
   *      in: "path"
   *      description: "ID of Tasks's TaskGroup to return"
   *    - name : "done"
   *      in: "query"
   *      description: "Filter by done or to do tasks"
   *      type: "boolean"
   *    responses:
   *      '200':
   *        description: Tasks in the TaskGroup successfully retrieved
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
   *                  type: "integer"
   *      '403':
   *        description: Unauthorized
   *      '404':
   *        description: TaskGroup not found with id
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/:id/tasks", [authJwt.verifyToken], taskGroup.findAllTasksByTaskGroupId);

  // Retrieve a single TaskGroup with id
  /**
   * @swagger
   * /api/task-group/{taskGroupId}:
   *  get:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "TaskGroup"
   *    summary: Retrieve a single TaskGroup with id [UserAccess]
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
   *            id:
   *              type: "integer"
   *            title:
   *              type: "string"
   *            UserId:
   *              type: "integer"
   *      '403':
   *        description: Unauthorized
   *      '404':
   *        description: TaskGroup not found with id
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/:id", [authJwt.verifyToken], taskGroup.findOne);

  // Update a TaskGroup with id
  /**
   * @swagger
   * /api/task-group/{taskGroupId}:
   *  put:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "TaskGroup"
   *    summary: Update a TaskGroup [UserAccess]
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
   *            id:
   *              type: "integer"
   *            title:
   *              type: "string"
   *            UserId:
   *              type: "integer"
   *      '400':
   *        description: Wrong TaskGroup's id or body parameters/content
   *      '403':
   *        description: Unauthorized
   *      '500':
   *        description: Internal Server Error
   */
  router.put("/:id", [authJwt.verifyToken], taskGroup.update);

  // Delete a TaskGroup with id
  /**
   * @swagger
   * /api/task-group/{taskGroupId}:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "TaskGroup"
   *    summary: Delete a TaskGroup [UserAccess]
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
   *              type: "integer"
   *      '403':
   *        description: Unauthorized
   *      '404':
   *        description: TaskGroup not found
   *      '500':
   *        description: Internal Server Error
   */
  router.delete("/:id", [authJwt.verifyToken], taskGroup.delete);

  // Delete all TaskGroups
  /**
   * @swagger
   * /api/task-group:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "TaskGroup"
   *    summary: Delete all TaskGroups [AdminAccess]
   *    description: Delete all TaskGroups
   *    consumes: application/json
   *    produces: application/json
   *    responses:
   *      '200':
   *        description: TaskGroups successfully deleted
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
  router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], taskGroup.deleteAll);

  app.use("/api/task-group", router);
};
