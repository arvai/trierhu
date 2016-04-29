var express = require('express');
var app = express();

// Default 
app.get('/', function (req, res) {
	res.send('Hello World!');
});

 
// Shut down myself.
// Before deploying, the server should be shutted down...
app.get('/shutdown', function(req, res) {
	var itsMe = req.connection.remoteAddress == '::1';

	if (itsMe) {
		console.log('Closing app.');
		process.exit(1);
	}
});

var server = app.listen(3000, function () {
	console.log('ServerApp listening on port 3000');
});