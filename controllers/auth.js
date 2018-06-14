module.exports = function(){
  var express = require("express");
  var router = express.Router();

  router.post("/login", function(req, res){
    console.log(req);
    console.log(req.params.password);
    res.json({
      "username":req.query.username,
      "password":req.query.password
    });
  });

  router.post("/signup", function(req, res){
    res.json({"helloWorld":"Hello World!"});
  });
  return router;
}
