const   fs				= require('fs'),
		path			= require('path');

		var express = require('express');
		var app = express();
		var http = require('http');
		var server = http.createServer(app);
		var io = require('socket.io').listen(server);
		var pg = require('pg');
		var async = require('async');
		pg.defaults.ssl = true;
		pg.connect(process.env.DATABASE_URL, function(err, client) {
			if (err) throw err;
			console.log('Checking database connection.');
			/*client
				.query('SELECT table_schema,table_name FROM information_schema.tables;')
				.on('row', function(row) {
					console.log(JSON.stringify(row));
				});*/
			client
				.query('SELECT * FROM "TakenIDs";')
				.on('row', function(row) {
					console.log(JSON.stringify(row));
				});
			client
				.query('SELECT COUNT(idname) FROM "TakenIDs" WHERE idname=\'AdmUsr\';')
				.on('row', function(row) {
					console.log(JSON.stringify(row));
				});
		});

app.set('port', (process.env.PORT || 5000));
server.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

app.use(express.static(__dirname + '/static'));

app.get('/', function(request, response) {
  response.render('pages/index');
});

io.on('connection', function(socket) {
	console.log('User connected');

	socket.on('generate UID', function() {
		console.log('Generate UID request received');
		//genUID();
		//IDavailable = 0;
		//for(var i=0; i < 5; i++) {
			async.parallel([genUID, checkUIDs], function(err, result) {
				if (err) {
					console.log(err);
					return;
				};
				console.log(result);
			});
		//};
	});

	socket.on('disconnect', function() {
		console.log('User disconnected');
	});
});
setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

var userID = '';
var attempts = 0;
//var IDavailable = 0;

function pausecomp(millis) {
	var date = new Date();
	var curDate = null;

	do { curDate = new Date(); }
	while(curDate-date < millis);
};

var genUID = function(callback) {
	var possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	console.log('ID generation started');
	//while (IDavailable != 1) {
		//for(var i=0; i < 5; i++) {
			//preventing the userID from growing 5 characters with each failed attempt
			userID = '';
			for(var j=0; j < 6; j++) {
				userID += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
			};
			//attempts = attempts+1;
			console.log('Checking for ID ' + userID);
			callback(null, 'Attempted ID: ' + userID);
			//checkUIDs(userID, 1);
			//pausecomp(1000);
			/*if(attempts == 5) {
				console.log('Query unsuccessful');
				IDavailable = 1;
			};*/
		//};
	//};
};
var checkUIDs = function(callback) {
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if (err) throw err;
		console.log('Connected to postgres');
		client.query('SELECT COUNT(idname) FROM "TakenIDs" WHERE idname=\'' + userID + '\';', function(err, data) {
			console.log('Query started for ' + userID);
			console.log(JSON.stringify(data) + ' matches');
			console.log(data."count" + ' matches');
			if(err) {
				throw new Error('Error querying for user ID.');
				userID = '';
			} else {
				console.log('Query passed');
				if(data == 0) {
					console.log('User ID ' + userID + ' available. Inserting it into database');
					client.query('INSERT INTO "TakenIDs" (idname, idtype) VALUES (\'' + userID + '\', 1);', function(err, data) {
						if(err) {
							throw new Error('Error inserting user ID ' + userID);
						};
					});
					client
						.query('SELECT * FROM "TakenIDs";')
						.on('row', function(row) {
							console.log(JSON.stringify(row));
						});
					//socket.emit('return generated UID', content1);
					callback(null, 'New ID is ' + userID);
					//IDavailable = 1;
				} else {
					console.log('User ID ' + userID + ' not available. New attempt required');
					callback(null, 'ID not available. New attempt required');
					userID = '';
				};
			};
		});
	});
};