var port = 3000,
    express = require('express'),
    webApp = express(),
    bodyParser = require('body-parser'),
    mongoClient = require('mongodb').MongoClient,
    databaseInformation = {
      database:"user",
      db:   mongoClient,
      url:  'mongodb://localhost:27017'
    }

// Use body parser for the web app.
webApp.use(bodyParser.urlencoded({extended:false}));
webApp.use(bodyParser.json());

webApp.use('/', require('./user-controller')(databaseInformation));
webApp.listen(port);
