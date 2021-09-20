# TODO Node.js Express Sequelize PostgreSQL Rest API

## Description

This is a TODO backend application using the Node.js environnement with Express to handle the API routes and Sequelize to communicate with the database.

The API provides access to the following database :

![Database UML diagram](/app/assets/TODO-database-uml.svg)

The API aims to serve a React frontend first, then another in Angular and a React Native or Flutter mobile application to finish.

A documentation of the REAST API is available at /api-docs

## To launch the app

First clone the git repository

    git clone https://github.com/Julien-Wiegandt/todo-node-express-postgresql.git

Then create a **_.env_** at the root of the project with this variables

    DB_PASSWORD=password
    DB_USER=user
    DB_HOST=host
    DB_NAME=database

    ADMIN_EMAIL=admin
    ADMIN_PASSWORD=password

    JWT_SECRET_KEY=secret-key

    PORT=3000

It's almost done, now add the npm packages

    npm install

Launch the server

    node server.js

## Important things to know

- Currently the database is hosted on Heroku, as is the application.

- Routes are secured with JWT tokens. Users can only access resources that belong to them, the Admin role allows access to specific general routes.

- To reset the database you have to launch the app with this code in **_server.js_**

        // force: true will Drop and re-sync the db
        db.sequelize.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db.");
        });

  Then

        // force: true will Drop and re-sync the db
        db.sequelize.sync({ force: false }).then(() => {
        console.log("Drop and re-sync db.");
        });

- The roles "User" and "Admin" are initialized, the creation of an administrator is automatically performed.

- The sequelize queries are quite long because we check if the targeted resource belongs to the user who makes the query. An idea for improvement could be to put the userId and why not its role in all tables that will require these checks.

- The swagger technology allows a nice documentation of the API.

### Dependencies

Available here :
https://www.npmjs.com/package/ + packageName

"bcrypt": "^5.0.1"

"cors": "^2.8.5"

"dotenv": "^10.0.0"

"express": "^4.17.1"

"jsonwebtoken": "^8.5.1"

"pg": "^8.7.1"

"pg-hstore": "^2.3.4"

"sequelize": "^6.6.5"

"swagger-jsdoc": "^6.1.0"

"swagger-ui-express": "^4.1.6"

### Sources

Sequelize doc :
https://sequelize.org/master/

Express doc :
https://expressjs.com/

Swagger doc :
https://swagger.io/

NodeJS + Express + PostgreSQL sequelize simple CRUD API :
https://www.bezkoder.com/node-express-sequelize-postgresql/

NodeJS + Express + MongoDB simple CRUD API :
https://www.bezkoder.com/node-express-mongodb-crud-rest-api/

Autogenerating Swagger Documentation with NodeJS & Express :
https://www.youtube.com/watch?v=apouPYPh_as
