var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost:27017/trierhu');

var db = mongoose.connection;

// Creating schema for Journeys mongo collection
var journeysSchema = new mongoose.Schema({
	bus: String
});

var Journeys = mongoose.model('Journeys', journeysSchema);

// Default 
app.get('/', function (req, res) {
	res.send('ExpressJS Backend is up and running!');
});

// Get timetable 
app.get('/get-timetable', function (req, res) {
	Journeys.find(function(err, journeys) {
		if (err) return console.error(err);
		res.send(journeys);
	});
/*	var obj = {bus: '11'};

	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(obj));*/
}); 

var server = app.listen(3000, function () {
	console.log('ServerApp listening on port 3000');
});