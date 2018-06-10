var port = 8081
var express = require('express');
var webApp = express();
var bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;

var databaseInformation = {
  db:mongoClient,
  url:'mongodb://localhost:27017',
  database:"user"
}

// Use body parser for the web app.
webApp.use(bodyParser.urlencoded({extended:false}));
webApp.use(bodyParser.json());

webApp.use('/', require('./user-controller')(databaseInformation));
webApp.listen(port);
