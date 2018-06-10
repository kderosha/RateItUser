var express = require('express');

module.exports = function(mongoDbInformation){
  var router = express.Router();
  router.use(function(req, res, next){
    next();
  });

  /**
    Sign a user up for the site. Connect to the local mongo instance.
    Connect to the database and insert a user.
  */
  router.get("/signup", function(req, res){
    res.send("signup");
  });

  /**
    log the user into the site by returning a token and redirecting to reviews
  */
  router.get("/login", function(req, res){
    res.send("login");
  });

  return router;
}
