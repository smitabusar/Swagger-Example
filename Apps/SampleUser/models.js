module.exports = {
    "User":{
      "id":"User",
      "properties":{
        "tags":{
          "items":{
            "$ref":"Tag"
          },
          "type":"Array"
        },
        "id":{
          "type":"long"
        },
        "status":{
          "allowableValues":{
            "valueType":"LIST",
            "values":[
              "single",
              "married"
            ],
            "valueType":"LIST"
          },
          "type":"string"
        },
        "name":{
          "type":"string"
        },
        "photoUrls":{
          "items":{
            "type":"string"
          },
          "type":"Array"
        }
      }
    },
    "Tag":{
      "id":"Tag",
      "properties":{
        "id":{
          "type":"long"
        },
        "name":{
          "type":"string"
        }
      }
    }
  }
