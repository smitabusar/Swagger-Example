var sw = require("../../node_modules/swagger-node-express/Common/node/swagger.js");
var param = require("../../node_modules/swagger-node-express/Common/node/paramTypes.js");
var url = require("url");
var swe = sw.errors;

var userData = require("./data.js");

function writeResponse (res, data) {
	sw.setHeaders(res);
  res.send(JSON.stringify(data));
}

exports.findById = {
  'spec': {
    "description" : "Operations about users",
    "path" : "/user.{format}/{userId}",
    "notes" : "Returns a user based on ID",
    "summary" : "Find user by ID",
    "method": "GET",
    "params" : [param.path("userId", "ID of user that needs to be fetched", "string")],
    "responseClass" : "User",
    "errorResponses" : [swe.invalid('id'), swe.notFound('user')],
    "nickname" : "getUserById"
  },
  'action': function (req,res) {
    if (!req.params.userId) {
      throw swe.invalid('id'); }
    var id = parseInt(req.params.userId);
    var user = userData.getUserById(id);

    if(user) res.send(JSON.stringify(user));
    else throw swe.notFound('user');
  }
};

exports.findByTags = {
  'spec': {
    "path" : "/user.{format}/findByTags",
    "notes" : "Multiple tags can be provided with comma-separated strings. Use IT,Medicine,Others for testing.",
    "summary" : "Find users by tags",
    "method": "GET",    
    "params" : [param.query("tags", "Tags to filter by", "string", true, true)],
    "responseClass" : "List[User]",
    "errorResponses" : [swe.invalid('tag')],
    "nickname" : "findUsersByTags"
  },
  'action': function (req,res) {
    var tagsString = url.parse(req.url,true).query["tags"];
    if (!tagsString) {
      throw swe.invalid('tag'); }
    var output = userData.findUserByTags(tagsString);
    writeResponse(res, output);
  }
};

exports.addUser = {
  'spec': {
    "path" : "/user.{format}",
    "notes" : "adds a user to the store",
    "summary" : "Add a new user to the store",
    "method": "POST",
    "params" : [param.body("User", "User object that needs to be added to the store", "User")],
    "errorResponses" : [swe.invalid('input')],
    "nickname" : "addUser"
  },  
  'action': function(req, res) {
    var body = req.body;
    if(!body || !body.id){
      throw swe.invalid('user');
    }
    else{
	    userData.addUser(body);
	    res.send(200);
	  }  
  }
};

exports.updateUser = {
  'spec': {
    "path" : "/user.{format}",
    "notes" : "updates a user in the store",
    "method": "PUT",    
    "summary" : "Update an existing user",
    "params" : [param.body("User", "User object that needs to be updated in the store", "User")],
    "errorResponses" : [swe.invalid('id'), swe.notFound('user'), swe.invalid('input')],
    "nickname" : "addUser"
  },  
  'action': function(req, res) {
    var body = req.body;
    if(!body || !body.id){
      throw swe.invalid('user');
    }
    else {
	    userData.addUser(body);
	    res.send(200);
	  }
  }
};

exports.deleteUser = {
  'spec': {
    "path" : "/user.{format}/{id}",
    "notes" : "removes a user from the store",
    "method": "DELETE",
    "summary" : "Remove an existing user",
    "params" : [param.path("id", "ID of user that needs to be removed", "string")],
    "errorResponses" : [swe.invalid('id'), swe.notFound('user')],
    "nickname" : "deleteUser" 
  },  
  'action': function(req, res) {
    var id = parseInt(req.params.id);
    userData.deleteUser(id)
    res.send(200);
  }
};
