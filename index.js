const fs = require('fs');
const path = require('path');
var logger = require('tracer').colorConsole();

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var pg = require('pg');
pg.defaults.ssl = false;

var conString = process.env.DATABASE_URL || 'postgres://remnant:qwerty123@localhost:5432/remnant';
pg.connect(conString, function (err, client) {
    if (err) {
        throw err;
    }
    logger.log('Checking database connection.');
    client
        .query('SELECT * FROM "GRIDs" ORDER BY idname;')
        .on('row', function (row) {
            logger.log(JSON.stringify(row));
        });
});

app.set('port', (process.env.PORT || 5000));
server.listen(app.get('port'), function () {
    logger.log('Node app is running on port', app.get('port'));
});

app.use(express.static(__dirname + '/static'));

app.get('/', function (request, response) {
    response.render('pages/index');
});

function pausecomp(millis) {
    var date = new Date();
    var curDate = null;
    do {
        curDate = new Date();
    }
    while (curDate - date < millis);
}

io.on('connection', function (socket) {
    var userID = '';
    var gameRoomID = '';
    var hits = 0;
    socket.on('existing user connection', function (UID) {
        userID = UID;
        logger.log('User ' + UID + ' connected');
    });

    socket.on('news request', function () {
        pg.connect(conString, function (err, client) {
            client
                .query('SELECT * FROM "NewsFeed" ORDER BY newsid;')
                .on('row', function (row) {
                    socket.emit('news', JSON.stringify(row).substring((JSON.stringify(row).search(',') + 1), JSON.stringify(row).length));
                });
        });
    });

    socket.on('generate UID', function () {
        logger.log('Generate UID request received');
        new Promise(function (resolve, reject) {
            var possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            logger.log('ID generation started');
            //preventing the userID from growing 5 characters with each failed attempt
            userID = '';
            for (var j = 0; j < 6; j++) {
                userID += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
            }
            logger.log('Checking for ID ' + userID);
            resolve('UID generation complete');
        }).then(function () {
            logger.log('Connecting to postgres...');
            pg.connect(conString, function (err, client) {
                if (err) {
                    throw err;
                }
                logger.log('Connected to postgres');
                client
                    .query('SELECT COUNT(idname) FROM "UIDs" WHERE idname=$1;', [userID])
                    .on('row', function (row) {
                        logger.log(row);
                        hits = parseInt(row.count);
                        logger.log(hits + ' matches');
                        if (err) {
                            userID = '';
                            //reject('failed to update lobbies');
                            throw new Error(err + ' --- Error querying for user ID.');
                        } else {
                            logger.log('Query passed');
                            if (hits === 0) {
                                logger.log('User ID ' + userID + ' available. Inserting it into database');
                                client.query('INSERT INTO "UIDs" (idname) VALUES ($1);', [userID], function (err, data) {
                                    if (err) {
                                        //reject('failed to update lobbies');
                                        throw new Error(err + ' --- Error inserting user ID ' + userID);
                                    }
                                });
                                socket.emit('return generated UID', userID);
                                logger.log('ID successfully assigned');
                            } else {
                                logger.log('User ID ' + userID + ' not available. New attempt required');
                                userID = '';
                            }
                        }
                    });
            });
        });
    });
    socket.on('generate GRID', function () {
        logger.log('Generate GRID request received');
        new Promise(function (resolve, reject) {
            var possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            logger.log('GRID generation started');
            //preventing the userID from growing 5 characters with each failed attempt
            gameRoomID = '';
            for (var j = 0; j < 5; j++) {
                gameRoomID += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
            }
            logger.log('Checking for game room ' + gameRoomID);
            resolve('GRID generation complete');
        }).then(function () {
            pg.connect(conString, function (err, client) {
                if (err) {
                    throw err;
                }
                logger.log('Connected to postgres');
                client
                    .query('SELECT COUNT(idname) FROM "GRIDs" WHERE idname=$1;', [gameRoomID])
                    .on('row', function (row) {
                        hits = parseInt(row.count);
                        logger.log(hits + ' matches');
                        if (err) {
                            gameRoomID = '';
                            //reject('failed to update lobbies');
                            throw new Error('Error querying for game room ID.');
                        } else {
                            logger.log('Query passed');
                            if (hits === 0) {
                                logger.log('Game room ' + gameRoomID + ' available. Inserting it into database');
                                client.query(
                                    'INSERT INTO "GRIDs" (idname, status, playerid, playerready, playercommname, playerkingdompref) VALUES ($1, $2, $3, $4, $5, $6)', [
                                        gameRoomID, 0, ['', '', '', ''],
                                        [0, 0, 0, 0],
                                        ['', '', '', ''],
                                        [0, 0, 0, 0]
                                    ],
                                    function (err, data) {
                                        if (err) {
                                            //reject('failed to update lobbies');
                                            logger.error(err);
                                            throw new Error('Error inserting game room ID ' + gameRoomID);
                                        }
                                    });
                                socket.emit('return generated GRID', gameRoomID);
                                socket.join(gameRoomID);
                            } else {
                                logger.log('Game room ID ' + gameRoomID + ' not available. New attempt required');
                                gameRoomID = '';
                            }
                        }
                    });
            });
        });
    });

    socket.on('join lobby request', function (roomID, UID) {
        pg.connect(conString, function (err, client) {
            if (err) {
                throw err;
            }
            logger.log('Connected to postgres');
            client
                .query('SELECT * FROM "GRIDs" WHERE idname = $1;', [roomID])
                .on('row', function (row) {
                    logger.log('Checking for lobby for room ' + roomID);
                    logger.log(JSON.stringify(row));
                    var status = parseInt(row.status);
                    logger.log('Status: ' + status);
                    if (err) {
                        gameRoomID = '';
                        throw new Error('Error querying for game room ID.');
                    } else {
                        logger.log('Query passed');
                        if (status === 1) {
                            logger.log('Game room ' + roomID + ' has already started');
                            socket.emit('game already started');
                        } else if (status === 0) {
                            var emptyid;
                            logger.log(row.playerid);
                            for (var i = 1; i <= 4; i++) {
                                logger.log(i);
                                logger.log(row.playerid[i]);
                                if (row.playerid[i] === '') {
                                    emptyid = i;
                                    break;
                                }
                            }
                            if (emptyid !== undefined) {
                                client.query('UPDATE "GRIDs" SET playerid[$1] = $2 WHERE idname = $3;', [emptyid, UID, roomID], function (
                                    err, data) {
                                    if (err) {
                                        throw new Error('Error adding ' + UID + ' to game room ' + roomID);
                                    }
                                });
                                gameRoomID = roomID;
                                socket.join(roomID);
                                logger.log(JSON.stringify(row));
                                socket.emit('join lobby request accepted', emptyid, roomID, row);
                                socket.broadcast.to(roomID).emit('player joined lobby', emptyid);
                            } else {
                                logger.log('Could not find an empty spot in room ' + roomID);
                                socket.emit('room full');
                            }
                        } else {
                            logger.log('Game room ID ' + gameRoomID + ' not available. Please check for typing errors');
                        }
                        gameRoomID = '';
                    }
                });
        });
    });

    socket.on('update lobby info', function (roomID, pNumber, pID, pReady, pCommName, pKingdomPref) {
        logger.log('Room ID: ' + roomID + ', sent player number: ' + pNumber + ', sent player ID: ' + pID + ', sent player ready: ' + pReady +
            ', sent player commander: ' + pCommName + ', sent player kingdom preference: ' + pKingdomPref);
        new Promise(function (resolve, reject) {
            logger.log('Promise started');
            pg.connect(conString, function (err, client) {
                if (err) {
                    throw err;
                }
                // Postgres is 1 indexed, up the index by 1 to translate
                pNumber++;
                logger.log('Connected to postrges');
                logger.log(
                    'Query: UPDATE "GRIDs" SET playerid[%s] = %s, playerready[%s] = %s, playercommname[%s] = %s, playerkingdompref[%s] = %s WHERE idname = %s;',
                    pNumber, pID, pNumber, pReady, pNumber, pCommName, pNumber, pKingdomPref, roomID);
                client.query(
                    'UPDATE "GRIDs" SET playerid[$1] = $2, playerready[$3] = $4, playercommname[$5] = $6, playerkingdompref[$7] = $8 WHERE idname = $9;', [
                        pNumber, pID, pNumber, pReady, pNumber, pCommName, pNumber, pKingdomPref, roomID
                    ],
                    function (err, data) {
                        if (err) {
                            throw new Error(err + ' --- Error updating room ' + roomID + ' with new info');
                            //reject('failed to update lobbies');
                        }
                        logger.log('Room info updated');
                        resolve('lobbies updated');
                    }).then(function () {
                    client.query('SELECT * FROM "GRIDs" WHERE idname = $1;', [roomID])
                        .on('row', function (row) {
                            logger.log(JSON.stringify(row));
                            logger.log('Room info broadcasted');
                            socket.broadcast.to(roomID).emit('update lobby info', row);
                        });
                });
            });
        });
    });

    socket.on('host leaves', function (roomID) {
        socket.broadcast.to(roomID).emit('dc by host');
        pg.connect(conString, function (err, client) {
            if (err) {
                throw err;
            }
            client.query('DELETE FROM "GRIDs" WHERE idname=$1;', [roomID]);
            logger.log('Room ' + roomID + ' deleted');
        });
    });
    socket.on('leave room', function (roomID) {
        socket.leave(roomID);
    });

    socket.on('disconnect', function () {
        logger.log('User ' + userID + ' disconnected');
    });

    setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

    /*var genUID = function(callback) {
    	var possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    	logger.log('ID generation started');
    	//preventing the userID from growing 5 characters with each failed attempt
    	userID = '';
    	for(var j=0; j < 6; j++) {
    		userID += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    	};
    	logger.log('Checking for ID ' + userID);
    	callback(null, 'Attempted ID: ' + userID);
    };
    var checkUIDs = function(callback) {
    	pg.connect(conString, function(err, client) {
    		if (err) throw err;
    		logger.log('Connected to postgres');
    		client
    		 .query('SELECT COUNT(idname) FROM "UIDs" WHERE idname=\'' + userID + '\';')
    		 .on('row', function(row) {
    			logger.log('Query started for ' + userID);
    			hits = JSON.stringify(row).substring(10, (JSON.stringify(row).length - 2));
    			logger.log(hits + ' matches');
    			if(err) {
    				throw new Error('Error querying for user ID.');
    				userID = '';
    			} else {
    				logger.log('Query passed');
    				if(hits == 0) {
    					logger.log('User ID ' + userID + ' available. Inserting it into database');
    					client.query('INSERT INTO "UIDs" (idname) VALUES (\'' + userID + '\');', function(err, data) {
    						if(err) {
    							throw new Error('Error inserting user ID ' + userID);
    						};
    					});
    					socket.emit('return generated UID', userID);
    					callback(null, 'ID successfully assigned');
    				} else {
    					logger.log('User ID ' + userID + ' not available. New attempt required');
    					callback(null, 'ID not available. New attempt required');
    					userID = '';
    				};
    			};
    		});
    	});
    };*/

    /*var genGRID = function(callback) {
    	var possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    	logger.log('GRID generation started');
    	//preventing the userID from growing 5 characters with each failed attempt
    	gameRoomID = '';
    	for(var j=0; j < 5; j++) {
    		gameRoomID += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    	};
    	logger.log('Checking for game room ' + gameRoomID);
    	callback(null, 'Attempted game room ID: ' + gameRoomID);
    };
    var checkGRIDs = function(callback) {
    	pg.connect(conString, function(err, client) {
    		if (err) throw err;
    		logger.log('Connected to postgres');
    		client
    		 .query('SELECT COUNT(idname) FROM "GRIDs" WHERE idname=\'' + gameRoomID + '\';')
    		 .on('row', function(row) {
    			logger.log('Query started for ' + gameRoomID);
    			hits = JSON.stringify(row).substring(10, (JSON.stringify(row).length - 2));
    			logger.log(hits + ' matches');
    			if(err) {
    				throw new Error('Error querying for game room ID.');
    				gameRoomID = '';
    			} else {
    				logger.log('Query passed');
    				if(hits == 0) {
    					logger.log('Game room ' + gameRoomID + ' available. Inserting it into database');
    					client.query('INSERT INTO "GRIDs" (idname, status, playerid, playerready, playercommname, playerkingdompref) VALUES (\'' + gameRoomID + '\', 0, ARRAY[$$\'\'$$,$$\'\'$$,$$\'\'$$,$$\'\'$$], ARRAY[0,0,0,0], ARRAY[$$\'\'$$,$$\'\'$$,$$\'\'$$,$$\'\'$$], ARRAY[0,0,0,0]);', function(err, data) {
    						if(err) {
    							throw new Error('Error inserting game room ID ' + gameRoomID);
    						};
    					});
    					socket.emit('return generated GRID', gameRoomID);
    					socket.join(gameRoomID);
    					callback(null, 'ID successfully assigned');
    				} else {
    					logger.log('Game room ID ' + gameRoomID + ' not available. New attempt required');
    					callback(null, 'ID not available. New attempt required');
    					gameRoomID = '';
    				};
    			};
    		});
    	});
    };*/
});

process.on('SIGTERM', function () {
    logger.log('Shutting down.');
    if (io && io.socket) {
        io.socket.broadcast.send({
            type: 'error',
            msg: 'server disconnected with SIGTERM'
        });
    }
    app.close();
    process.exit(-1);
});
