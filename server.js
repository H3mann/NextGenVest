var express = require("express");
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var cors = require("cors");
// var router = require('./server/routes/routes.js')

console.log('here')
var port = process.env.PORT || 3000; 
// require('./server/models/db.js')

var app = express();

/* Initialize the server */
/* Add middleware */
app.use(cors());
app.use(bodyParser.json());

//set static file location
app.use("/", express.static(__dirname + "/client/"));


/* API Routes */
// app.use("/api", apiRouter);
// app.use(router)

// start app ===============================================
app.listen(port);
console.log('app started on port: ' + port);
