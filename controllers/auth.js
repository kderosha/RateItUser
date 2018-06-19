module.exports = function(mongoClient){
  var express = require("express");
  var jsonWebToken = require("jsonwebtoken");
  var router = express.Router();
  var saltRounds = 10;
  const bcrypt = require('bcrypt');
  var superSecretSecret = "rateItIsAnAwesomeApplication";

  router.get("/login", function(req, response){
    console.log(req.query.email);
    console.log(req.query.password);
    mongoClient.connect("mongodb://localhost:27017/users", function(err, db){
      if(err) throw err;
      var dbo = db.db("users");
      dbo.createCollection("users", function(err, res){
        dbo.collection("users").findOne({email:req.query.email}, function(err, results){
          if(err) throw err;
          console.log("found a user");
          console.log(results);
          db.close();
          bcrypt.compare(req.query.password, results.hashedPassword, function(err, matched){
            if(matched){
              // create a jwt token and send it back;
              var claims = {
                _id:results._id,
                userName:results.userName
                email:results.email
              }
              var signedToken = jsonWebToken.sign(claims, "SECRETKEY", {algorithm:"HS512"});

              response.json({
                rateItToken:signedToken
              });
            } else {
              response.send("no password");
            }
          });
        });
      });
    });
  });

  /**
    A route endpoint to sign up a user
    process: grab plaintext password sent over https. hash that password with bcrypts algorithm.
    connect to the mongo database. use the users table and insert a document containing.
    { email:, hashedPassword:, userName:,}. Once the user is inserted create a jwt out of the
    users id, username
  */
  router.post("/signup", function(req, response){
    var password = req.body.password;
    bcrypt.genSalt(saltRounds, function(err, salt){
      bcrypt.hash(password, salt, function(err, hash){
        var signUpUser = {
          email:req.body.email,
          userName:req.body.userName,
          hashedPassword:hash
        }
        mongoClient.connect("mongodb://localhost:27017/users", function(err, db){
          if(err) throw err;
          var dbo = db.db("users");
          dbo.createCollection("users", function(err, res){
            dbo.collection("users").insertOne(signUpUser, function(err, res){
              if(err) throw err;
              console.log("inserted document");
              // Find the newly created user.
              console.log(req.body);
              // create a jwt token and send it back;
              response.json(res);
            });
          });
        });
      });
    });
  });
  return router;
}
