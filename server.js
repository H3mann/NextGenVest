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

app.get('/loanData', function(req,res) {
	var data = {
		privateBankLoan: 4.2,
		universityLoan: 4.0,
		directSubsidizedLoan: 3.76,
		directUnsubsidizedLoan: 3.76
	}
	console.log('we')
	res.send(data);
})


/* API Routes */
// app.use("/api", apiRouter);
// app.use(router)

// start app ===============================================
app.listen(port);
console.log('app started on port: ' + port);
