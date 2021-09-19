const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

// Swagger configs
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "TODO API",
      description: "NodeJS + Express + MongoDB todo API",
      contact: {
        name: "Julien Wiegandt",
        email: "julienwiegandt@gmail.com",
      },
      license: {
        name: "MIT",
        url: "https://mit-license.org/",
      },
      servers: ["http://localhost:8080"],
    },
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "x-access-token",
        scheme: "bearer",
        in: "header",
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["app/routes/*.js", "server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 * /:
 *  get:
 *    description: Testing route
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/", (req, res) => {
  res.json({ message: "Welcome to TODO application." });
});

require("./app/routes/Task.routes")(app);
require("./app/routes/TaskGroup.routes")(app);
require("./app/routes/User.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
// force: true will Drop and re-sync the db
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
