const   fs				= require('fs'),
		path			= require('path');

		var express = require('express');
		var app = express();
		var http = require('http');
		var server = http.createServer(app);
		var io = require('socket.io').listen(server);
		app.set('port', (process.env.PORT || 5000));
		server.listen(app.get('port'), function() {
			console.log('Node app is running on port', app.get('port'));
		});
		var pg = require('pg');
		pg.defaults.ssl = true;
		pg.connect(process.env.DATABASE_URL, function(err, client) {
			if (err) throw err;
			console.log('Connected to postgres. Getting schemas...');

			client
				.query('SELECT table_schema,table_name FROM information_schema.tables;')
				.on('row', function(row) {
					console.log(JSON.stringify(row));
				});
			client
				.query('SELECT * FROM "TakenIDs";')
				.on('row', function(row) {
					console.log(JSON.stringify(row));
				});
		});

app.use(express.static(__dirname + '/static'));

app.get('/', function(request, response) {
  response.render('pages/index');
});

io.on('connection', function(socket){
	console.log('user connected');

	socket.on('generate UID', function(){
		console.log('generate UID request received');
		genUID();
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});
setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

var valueReturned = false;
var userID = "";

function pausecomp(millis){
	var date = new Date();
	var curDate = null;

	do { curDate = new Date(); }
	while(curDate-date < millis);
};

function genUID(){
	var possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var IDavailable = 0;
	console.log('ID generation started');
	while (IDavailable != 1){
		for(var i=0; i < 5; i++){
			for(var j=0; j < 6; j++){
				userID += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
			};
			var attempts = i+1;
			console.log('Attempt #' + attempts + ': new ID is ' + userID);
			checkTakenIDs(userID, 1);
			pausecomp(1000);
			//preventing the userID from growing 5 characters with each failed attempt
			userID = "";
			if(attempts == 5){
				console.log('Query unsuccessful');
				IDavailable = 1;
			};
		};
	};
};
function checkTakenIDs(content1, content2){
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if (err) throw err;
		console.log('Connected to postgres.');
		client.query("SELECT COUNT(*) FROM TakenIDs WHERE takenID='" + content1 + "'", function(err, data){
			console.log('query started');
			if(err) {
				throw new Error('Error querying for user ID.');
				userID = "";
			}else{
				console.log('query passed');
				if(data == 0){
					client.query("INSERT INTO TakenIDs ('IDname', 'IDtype') VALUES ('" + content1 + "', '" + content2 + "');");
					IDavailable = 1;
					//socket.emit('return generated UID', content1);
					console.log('new ID is ' + content1);
				} else {
					console.log('ID not available. Retrying.');
					userID = "";
				};
			};
		});
	});
	valueReturned = true;
};