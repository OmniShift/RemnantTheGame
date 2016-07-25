const   fs				= require('fs'),
		path			= require('path'),
		contentTypes	= require('./utils/content-types'),
		sysInfo			= require('./utils/sys-info'),
		env				= process.env;
		
		let express = require('express');
		let app = express();
		let http = require('http').Server(app);
		let io = require('socket.io')(http);
		let mysql =  require('mysql');
		/*let database = mysql.createConnection({
			host: env.OPENSHIFT_MYSQL_DB_HOST,
			port: env.OPENSHIFT_MYSQL_DB_PORT,
			user: 'adminYHBtpyd',
			password: 'u7wtcDSZz1dE',
			database: 'remnantthegame'
		});*/

database.connect(function(err){
	if(!err) {
		console.log("Connected to database");
	} else {
		console.log(err.stack);
	}
});

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
	database.query("SELECT COUNT(*) FROM takenIDs WHERE takenID='" + content1 + "'", function(err, data){
		console.log('query started');
		if(err) {
			throw new Error('Error querying for user ID.');
			userID = "";
		}else{
			console.log('query passed');
			if(data == 0){
				database.query("INSERT INTO takenIDs ('takenID', 'IDtype') VALUES ('" + content1 + "', '" + content2 + "');");
				IDavailable = 1;
				//socket.emit('return generated UID', content1);
				console.log('new ID is ' + content1);
			} else {
				console.log('ID not available. Retrying.');
				userID = "";
			};
		};
	});
	valueReturned = true;
};

io.on('connection', function(socket){
	console.log('user connected');

	socket.on('generate UID', function(){
		genUID();
		console.log('generate UID request received')
	});
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
	console.log('Application worker ${process.pid} started...');
	console.log('listening at ' + env.NODE_IP + ':' + env.NODE_PORT);
});