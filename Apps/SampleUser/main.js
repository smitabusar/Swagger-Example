var express = require("express")
 , url = require("url")
 , swagger = require("../../node_modules/swagger-node-express/Common/node/swagger.js");

var Resources = require("./resources.js");

var app = express();
app.use(express.bodyParser());

// Set the main handler in swagger to the express app
swagger.setAppHandler(app);

var models = require("./models.js");

// Add models and methods to swagger
swagger.addModels(models)
  .addGet(Resources.findByTags)
  .addGet(Resources.findById)
  .addPost(Resources.addUser)
  .addPut(Resources.updateUser)
  .addDelete(Resources.deleteUser);

// Configures the app's base path and api version.
swagger.configure("http://localhost:8002", "0.1");

// Start the server on port 8002
app.listen(8002);
console.log("server started on 8002")