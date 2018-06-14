var port = 3001,
    express = require('express'),
    webApp = express(),
    bodyParser = require('body-parser'),
    mongoClient = require('mongodb').MongoClient,
    cors = require("cors");

webApp.use(cors());
// Use body parser for the web app.
webApp.use(bodyParser.urlencoded({extended:false}));
webApp.use(bodyParser.json());

webApp.use('/auth', require(__dirname + '/controllers/auth.js')());
webApp.listen(port);
