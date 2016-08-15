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
			client
			 .query('SELECT * FROM "GRIDs" ORDER BY idname;')
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

function pausecomp(millis) {
	var date = new Date();
	var curDate = null;
	do { curDate = new Date(); }
	while(curDate-date < millis);
};

io.on('connection', function(socket) {
	var userID = '';
	var gameRoomID = '';
	var hits = 0;
	socket.on('existing user connection', function(UID) {
		userID = UID;
		console.log('User ' + UID + ' connected');
	});

	socket.on('news request', function() {
		pg.connect(process.env.DATABASE_URL, function(err, client) {
			client
			 .query('SELECT * FROM "NewsFeed" ORDER BY newsid;')
			 .on('row', function(row) {
				socket.emit('news', JSON.stringify(row).substring((JSON.stringify(row).search(',') + 1), JSON.stringify(row).length));
			});
		});
	});

	socket.on('generate UID', function() {
		console.log('Generate UID request received');
		async.parallel([genUID, checkUIDs], function(err, result) {
			if (err) {
				console.log(err);
				return;
			};
			console.log(result);
		});
	});
	socket.on('generate GRID', function() {
		console.log('Generate GRID request received');
		//possibly change to promise
		async.parallel([genGRID, checkGRIDs], function(err, result) {
			if (err) {
				console.log(err);
				return;
			};
			console.log(result);
		});
	});

	socket.on('join lobby request', function(roomID, UID) {
		pg.connect(process.env.DATABASE_URL, function(err, client) {
			if (err) throw err;
			console.log('Connected to postgres');
			client
			 .query('SELECT * FROM "GRIDs" WHERE idname=\'' + roomID + '\';')
			 .on('row', function(row) {
				console.log('Checking for lobby for room ' + roomID);
				console.log(JSON.stringify(row));
				status = row.status;
				console.log('Status: ' + status);
				if(err) {
					throw new Error('Error querying for game room ID.');
					gameRoomID = '';
				} else {
					console.log('Query passed');
					if(status == 0) {
						for (i = 2; i < 5; i++) {
							if (row.playerid[i-1] != '') {
								client.query('UPDATE "GRIDs" SET playerid[' + i + '] = \'' + UID + '\' WHERE idname=\'' + roomID + '\';', function(err, data) {
									if(err) {
										throw new Error('Error adding ' + UID + ' to game room ' + roomID);
									};
								});
								gameRoomID = roomID;
								socket.join(roomID);
								socket.emit('join lobby request accepted', i, roomID);
								socket.broadcast.to(roomID).emit('player joined lobby', i);
								for (i = 2; i < 5; i++) {
									client
									 .query('SELECT (playerid, playerready, playercommname, playerkingdompref) FROM "GRIDs" WHERE idname=\'' + roomID + '\';')
									 .on('row', function(row) {
										console.log(JSON.stringify(row));
										console.log(row.playerid[i]);
										socket.emit('client lobby initialization', i, row);
									});
								};
								break;
							} else {
								if (i = 4) {
									socket.emit('room full');
								};
							};
						};
					} else if(status == 1) {
						console.log('Game room ' + roomID + ' has already started');
						socket.emit('game already started');
					} else {
						console.log('Game room ID ' + gameRoomID + ' not available. New attempt required');
					};
				gameRoomID = '';
				};
			});
		});
	});

	socket.on('update lobby info', function(roomID, pNumber, pID, pReady, pCommName, pKingdomPref) {
		console.log('Room ID: ' + roomID + ', sent player number: ' + pNumber + ', sent player ID: ' + pID + ', sent player ready: ' + pReady + ', sent player commander: ' + pCommName + ', sent player kingdom preference: ' + pKingdomPref);
		new Promise(function(resolve, reject) {
			pg.connect(process.env.DATABASE_URL, function(err, client) {
				if (err) throw err;
				client.query('UPDATE "GRIDs" SET playerid[' + pNumber + '] = \'' + pID + '\', playerready[' + pNumber + '] = ' + pReady + ', playercommname[' + pNumber + '] = \'' + pCommName + '\', playerkingdompref[' + pNumber + '] = ' + pKingdomPref + ' WHERE idname=\'' + roomID + '\';', function(err, data) {
					if(err) {
						throw new Error(err + ' --- Error updating room ' + roomID + ' with new info');
					};
					console.log('Room info updated');
				}).then(function() {
					client
					 .query('SELECT (playerid, playerready, playercommname, playerkingdompref) FROM "GRIDs" WHERE idname=\'' + roomID + '\';')
					 .on('row', function(row) {
					 	console.log(JSON.stringify(row));
						console.log('Room info broadcasted');
					 	socket.broadcast.to(roomID).emit('update lobby info', row);
					});
				});
			});
		});
	});

	socket.on('host leaves', function(roomID) {
		socket.broadcast.to(roomID).emit('dc by host');
		pg.connect(process.env.DATABASE_URL, function(err, client) {
			if (err) {
				throw err;
			};
			client.query('DELETE FROM "GRIDs" WHERE idname=\'' + roomID + '\';');
			console.log('Room ' + roomID + ' deleted');
		});
	});
	socket.on('leave room', function(roomID) {
		socket.leave(roomID);
	});

	socket.on('disconnect', function() {
		console.log('User ' + userID + ' disconnected');
	});

	setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

	var genUID = function(callback) {
		var possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		console.log('ID generation started');
		//preventing the userID from growing 5 characters with each failed attempt
		userID = '';
		for(var j=0; j < 6; j++) {
			userID += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
		};
		console.log('Checking for ID ' + userID);
		callback(null, 'Attempted ID: ' + userID);
	};
	var checkUIDs = function(callback) {
		pg.connect(process.env.DATABASE_URL, function(err, client) {
			if (err) throw err;
			console.log('Connected to postgres');
			client
			 .query('SELECT COUNT(idname) FROM "UIDs" WHERE idname=\'' + userID + '\';')
			 .on('row', function(row) {
				console.log('Query started for ' + userID);
				hits = JSON.stringify(row).substring(10, (JSON.stringify(row).length - 2));
				console.log(hits + ' matches');
				if(err) {
					throw new Error('Error querying for user ID.');
					userID = '';
				} else {
					console.log('Query passed');
					if(hits == 0) {
						console.log('User ID ' + userID + ' available. Inserting it into database');
						client.query('INSERT INTO "UIDs" (idname) VALUES (\'' + userID + '\');', function(err, data) {
							if(err) {
								throw new Error('Error inserting user ID ' + userID);
							};
						});
						/*client
							.query('SELECT * FROM "UIDs";')
							.on('row', function(row) {
								console.log(JSON.stringify(row));
							});*/
						socket.emit('return generated UID', userID);
						callback(null, 'ID successfully assigned');
					} else {
						console.log('User ID ' + userID + ' not available. New attempt required');
						callback(null, 'ID not available. New attempt required');
						userID = '';
					};
				};
			});
		});
	};

	var genGRID = function(callback) {
		var possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		console.log('GRID generation started');
		//preventing the userID from growing 5 characters with each failed attempt
		gameRoomID = '';
		for(var j=0; j < 5; j++) {
			gameRoomID += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
		};
		console.log('Checking for game room ' + gameRoomID);
		callback(null, 'Attempted game room ID: ' + gameRoomID);
	};
	var checkGRIDs = function(callback) {
		pg.connect(process.env.DATABASE_URL, function(err, client) {
			if (err) throw err;
			console.log('Connected to postgres');
			client
			 .query('SELECT COUNT(idname) FROM "GRIDs" WHERE idname=\'' + gameRoomID + '\';')
			 .on('row', function(row) {
				console.log('Query started for ' + gameRoomID);
				hits = JSON.stringify(row).substring(10, (JSON.stringify(row).length - 2));
				console.log(hits + ' matches');
				if(err) {
					throw new Error('Error querying for game room ID.');
					gameRoomID = '';
				} else {
					console.log('Query passed');
					if(hits == 0) {
						console.log('Game room ' + gameRoomID + ' available. Inserting it into database');
						client.query('INSERT INTO "GRIDs" (idname, status, playerid, playerready, playercommname, playerkingdompref) VALUES (\'' + gameRoomID + '\', 0, ARRAY[$$\'\'$$,$$\'\'$$,$$\'\'$$,$$\'\'$$], ARRAY[0,0,0,0], ARRAY[$$\'\'$$,$$\'\'$$,$$\'\'$$,$$\'\'$$], ARRAY[0,0,0,0]);', function(err, data) {
							if(err) {
								throw new Error('Error inserting game room ID ' + gameRoomID);
							};
						});
						socket.emit('return generated GRID', gameRoomID);
						socket.join(gameRoomID);
						callback(null, 'ID successfully assigned');
					} else {
						console.log('Game room ID ' + gameRoomID + ' not available. New attempt required');
						callback(null, 'ID not available. New attempt required');
						gameRoomID = '';
					};
				};
			});
		});
	};
});