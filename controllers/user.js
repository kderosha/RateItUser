module.exports = function(mongoClient){
  var express = require("express");
  var router = express.Router();
  var jsonWebToken = require("jsonwebtoken");
  var ObjectID = require("mongodb").ObjectID;

  router.use(function(req, res, next){
    var token = req.headers['x-access-token'];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jsonWebToken.verify(token, "SECRETKEY", function(err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          console.log(req.decoded);
          next();
        }
      });
    } else {
      // if there is no token; return an error
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });
    }
  });

  router.get("/profile", function(req, res){
    var token = req.decoded;
    console.log(token);
    console.log(new ObjectID(token._id));
    mongoClient.connect("mongodb://localhost:27017/users", function(err, db){
      if(err) throw err;
      var dbo = db.db("users");
      dbo.collection("users").findOne({
        _id:new ObjectID(token._id)
      }, {
        projection:{
          "userName":1,
          "email":1
        }
      }, function(err, results){
        if(err) throw err;
        console.log(results);
        db.close();
        res.json(results);
      });
    });
  });

  return router;
}
