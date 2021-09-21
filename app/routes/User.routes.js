module.exports = (app) => {
  const user = require("../controllers/User.controller.js");
  const { authJwt } = require("../middlewares");

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  // Create a new User
  /**
   * @swagger
   * /api/user:
   *  post:
   *    tags:
   *    - "User"
   *    summary: Create a User [AllAccess]
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
   *            id:
   *              type: "integer"
   *            email:
   *              type: "string"
   *            password:
   *              type: "string"
   *            RoleId:
   *              type: "integer"
   *      '400':
   *        description: Wrong User's body parameters/content
   *      '500':
   *        description: Internal Server Error
   */
  router.post("/", user.create);

  // Signin a user
  /**
   * @swagger
   * /api/user/signin:
   *  post:
   *    tags:
   *    - "User"
   *    summary: Signin a User [AllAccess]
   *    description: Signin a User
   *    consumes: application/json
   *    produces: application/json
   *    parameters:
   *    - in: body
   *      name: body
   *      description: A User need a email and a password to signin
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
   *        description: User successfully signin
   *        schema:
   *          type: "object"
   *          properties:
   *            id:
   *              type: "integer"
   *            email:
   *              type: "string"
   *            accessToken:
   *              type: "string"
   *      '400':
   *        description: Wrong User's body parameters/content
   *      '500':
   *        description: Internal Server Error
   */
  router.post("/signin", user.signin);

  // Retrieve all Users
  /**
   * @swagger
   * /api/user:
   *  get:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "User"
   *    summary: Retrieve all Users [AdminAccess]
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
   *              id:
   *                type: "integer"
   *              email:
   *                type: "string"
   *              password:
   *                type: "string"
   *              RoleId:
   *                type: "integer"
   *      '403':
   *        description: Unauthorized
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/", [authJwt.verifyToken, authJwt.isAdmin], user.findAll);

  // Retrieve a single User with id
  /**
   * @swagger
   * /api/user/{userId}:
   *  get:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "User"
   *    summary: Retrieve a single User with id [UserAccess]
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
   *            id:
   *              type: "integer"
   *            email:
   *              type: "string"
   *            password:
   *              type: "string"
   *            RoleId:
   *              type: "integer"
   *      '403':
   *        description: Unauthorized
   *      '404':
   *        description: User not found with id
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/:id", [authJwt.verifyToken], user.findOne);

  // Update a User with id
  /**
   * @swagger
   * /api/user/{userId}:
   *  put:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "User"
   *    summary: Update a User [UserAccess]
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
   *            id:
   *              type: "integer"
   *            email:
   *              type: "string"
   *            password:
   *              type: "string"
   *            RoleId:
   *              type: "integer"
   *      '400':
   *        description: Wrong User's id or body parameters/content
   *      '403':
   *        description: Unauthorized
   *      '500':
   *        description: Internal Server Error
   */
  router.put("/:id", [authJwt.verifyToken], user.update);

  // Delete a User with id
  /**
   * @swagger
   * /api/user/{userId}:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "User"
   *    summary: Delete a User [UserAccess]
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
   *              type: "integer"
   *      '403':
   *        description: Unauthorized
   *      '404':
   *        description: User not found
   *      '500':
   *        description: Internal Server Error
   */
  router.delete("/:id", [authJwt.verifyToken], user.delete);

  // Delete all Users
  /**
   * @swagger
   * /api/user:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "User"
   *    summary: Delete all Users [AdminAccess]
   *    description: Delete all Users
   *    consumes: application/json
   *    produces: application/json
   *    responses:
   *      '200':
   *        description: Users successfully deleted
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
  router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], user.deleteAll);

  // Retrieve all TaskGroups for one User with id
  /**
   * @swagger
   * /api/user/{userId}/task-groups:
   *  get:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *    - "User"
   *    summary: Retrieve all TaskGroups for one User with id [UserAccess]
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
   *              id:
   *                type: "integer"
   *              title:
   *                type: "string"
   *              UserId:
   *                type: "integer"
   *      '403':
   *        description: Unauthorized
   *      '404':
   *        description: User not found with id
   *      '500':
   *        description: Internal Server Error
   */
  router.get("/:id/task-groups", [authJwt.verifyToken], user.findTaskGroupsForOneUser);

  app.use("/api/user", router);
};
