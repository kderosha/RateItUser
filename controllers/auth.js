module.exports = function(mongoClient){
  var express = require("express");
  var router = express.Router();

  router.post("/login", function(req, res){
    res.json({});
  });

  router.post("/signup", function(req, res){
    var signUpUser = {
      userName:req.body.userName,
      password:req.body.password,
      email:req.body.email
    }
    mongoClient.connect("mongodb://localhost:27017/users", function(err, db){
      if(err) throw err;
      var dbo = db.db("users");
      dbo.createCollection("users", function(err, res){
        dbo.collection("users").insertOne(signUpUser, function(err, res){
          if(err) throw err;
          console.log("inserted document");
          db.close();
        });

      });
    })
    console.log(req.body);
    res.json({
      "username":req.body.username,
      "password":req.body.password
    });
  });
  return router;
}
