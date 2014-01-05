var swagger = require("swagger-client")

var s = new swagger.SwaggerApi({
  url: 'http://localhost:8002/api-docs'
});
s.build();

s.apis.user.getUserById({userId:1});