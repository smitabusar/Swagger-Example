var tags = {
  1: {id: 1, name: "IT"},
  2: {id: 2, name: "Medicine"},
  3: {id: 3, name: "Others"}};

var users = {
  1: {id: 1, 
		  name: "Jack", 
		  urls: ["url1", "url2"], 
		  tags: [tags[1], tags[2]],
		  status: "single"},
  2: {id: 2, 
      name: "Mona", 
      urls: ["url3"], 
      tags: [tags[1], tags[3]],
      status: "married"}
};

exports.getUserById = function getUserById(id) {
  return users[id];
}

exports.findUserByTags = function findUserByTags(tags) {
  var keys = {}
  var array = tags.split(",");
	array.forEach(function(item) {
	  keys[item] = item;
	})
  var output = [];
  for(key in users) {
    var user = users[key];
    if(user.tags) {
      user.tags.forEach(function (tag) {
        if(tag.name && keys[tag.name]) output.push(user);
      });
    }
  }
  return output;
}

exports.addUser = function addUser(user){
  users[user.id] = user;
}

exports.deleteUser = function deleteUser(id) {
  delete users[id];
}