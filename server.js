var port = 3001,
    express = require('express'),
    webApp = express(),
    bodyParser = require('body-parser'),
    mongoClient = require('mongodb').MongoClient,
    cors = require("cors"),
    mongoUsersDBURL = "mongodb://localhost:27017/users";


webApp.use(cors());
// Use body parser for the web app.
webApp.use(bodyParser.urlencoded({extended:false}));
webApp.use(bodyParser.json());

webApp.use('/auth', require(__dirname + '/controllers/auth.js')(mongoClient));
webApp.use('/user', require(__dirname + '/controllers/user.js')(mongoClient));
webApp.listen(port);
