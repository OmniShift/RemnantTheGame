const fs = require('fs');
const path = require('path');
const url = require('url');
const logger = require('tracer').colorConsole();
const pg = require('pg');

const params = url.parse(process.env.DATABASE_URL || 'postgres://remnant:qwerty123@localhost:5432/remnant');
const auth = params.auth.split(':');
const config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: false
};
/*
  Transforms, 'progres://DBuser:secret@DBHost:#####/myDB', into
  config = {
    user: 'DBuser',
    password: 'secret',
    host: 'DBHost',
    port: '#####',
    database: 'myDB',
    ssl: true
  }
*/

var pool = new pg.Pool(config);
pool.connect()
    .then(client => {
        client.query('SELECT * FROM "GRIDs" ORDER BY idname;')
            .on('row', function (row) {
                logger.log(JSON.stringify(row));
            })
            .then(res => {
                client.release();
            })
            .catch(e => {
                client.release();
                console.error('query error', e.message, e.stack);
            });
    });

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

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
    //var gameRoomID = '';
    //var hits = 0;
    socket.on('existing user connection', function (UID) {
        userID = UID;
        logger.log('User ' + UID + ' connected');
    });

    socket.on('news request', function () {
        logger.log('Requesting news');
        pool.query('SELECT * FROM "NewsFeed" ORDER BY newsid;').then(res => {
            if (res.rowCount > 0) {
                res.rows.forEach(function (row) {
                    socket.emit('news', {
                        'newsdate': row.newsdate,
                        'newscontent': row.newscontent
                    }); //JSON.stringify(row).substring((JSON.stringify(row).search(',') + 1), JSON.stringify(row).length));
                });
            }
        });
    });

    socket.on('generate UID', function () {
        logger.log('Generate UID request received');
        new Promise(function (resolve, reject) {
            var possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            logger.log('UID generation started');
            //preventing the userID from growing 5 characters with each failed attempt
            for (var j = 0; j < 6; j++) {
                userID += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
            }
            resolve(logger.log('UID generation complete'));
        }).then(function () {
            logger.log('Querying for ID ' + userID);
            pool.query('SELECT * FROM "UIDs" WHERE idname=$1;', [userID]).then(res => {
                    var hits = parseInt(res.rowCount);
                    logger.log(hits + ' matches');

                    logger.log('Query passed');
                    if (hits === 0) {
                        logger.log('User ID ' + userID + ' available. Inserting it into database');
                        pool.query('INSERT INTO "UIDs" (idname) VALUES ($1);', [userID], function (err, data) {
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

                })
                .catch(e => {
                    logger.error('query error', e.message, e.stack);
                });
        });
    });
    socket.on('generate GRID', function () {
        logger.log('Generate GRID request received');
        var gameRoomID = '';
        new Promise(function (resolve, reject) {
            var possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            logger.log('GRID generation started');
            //preventing the gameRoomID from growing 5 characters with each failed attempt
            for (var j = 0; j < 5; j++) {
                gameRoomID += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
            }
            logger.log('Checking for game room ' + gameRoomID);
            resolve(logger.log('GRID generation complete'));
        }).then(function () {
            pool.query('SELECT * FROM "GRIDs" WHERE idname=$1;', [gameRoomID]).then(res => {
                    var hits = parseInt(res.rowCount);
                    logger.log(hits + ' matches');

                    logger.log('Query passed');
                    if (hits === 0) {
                        logger.log('Game room ' + gameRoomID + ' available. Inserting it into database');
                        pool.query(
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

                })
                .catch(e => {
                    logger.error('query error', e.message, e.stack);
                });
        });
    });

    socket.on('join lobby request', function (roomID, UID) {
        var gameRoomID;
        pool.query('SELECT * FROM "GRIDs" WHERE idname = $1;', [roomID]).then(res => {
                if (res.rowCount > 0) {
                    logger.log('Checking for lobby for room ' + roomID);
                    logger.log(JSON.stringify(res.rows));
                    var row = res.rows[0];
                    var status = parseInt(row.status);
                    logger.log('Status: ' + status);
                    logger.log('Query passed');
                    if (status === 1) {
                        logger.log('Game room ' + roomID + ' has already started');
                        socket.emit('game already started');
                    } else if (status === 0) {
                        var emptyid;
                        logger.log(row.playerid);
                        for (var i = 0; i < 4; i++) {
                            logger.log(i);
                            logger.log(row.playerid[i]);
                            if (row.playerid[i] === '') {
                                emptyid = i;
                                break;
                            }
                        }
                        if (emptyid !== undefined) {
                            // emptyid + 1 since postgres is 1 indexed
                            pool.query('UPDATE "GRIDs" SET playerid[$1] = $2 WHERE idname = $3;', [emptyid + 1, UID, roomID], function (
                                err, data) {
                                if (err) {
                                    throw new Error('Error adding ' + UID + ' to game room ' + roomID);
                                }
                            });
                            gameRoomID = roomID;
                            socket.join(roomID);
                            logger.log('emptyid ' + emptyid);
                            logger.log(JSON.stringify(row));
                            socket.emit('join lobby request accepted', emptyid, roomID, row);
                            socket.broadcast.to(roomID).emit('player joined lobby', emptyid);
                        } else {
                            logger.log('Could not find an empty spot in room ' + roomID);
                            socket.emit('room full');
                        }
                    } else {
                        logger.log('Game room ID ' + roomID + ' not available. Please check for typing errors');
                    }
                } else {
                    logger.log('Game room ID ' + roomID + ' not available. Please check for typing errors');
                }
            })
            .catch(e => {
                logger.error('query error', e.message, e.stack);
            });
    });

    socket.on('update lobby info', function (roomID, pNumber, pID, pReady, pCommName, pKingdomPref) {
        logger.log('Room ID: ' + roomID + ', sent player number: ' + pNumber + ', sent player ID: ' + pID + ', sent player ready: ' + pReady +
            ', sent player commander: ' + pCommName + ', sent player kingdom preference: ' + pKingdomPref);
        new Promise(function (resolve, reject) {
            // Postgres is 1 indexed, up the index by 1 to translate
            pNumber++;
            logger.log(
                'Query: UPDATE "GRIDs" SET playerid[%s] = %s, playerready[%s] = %s, playercommname[%s] = %s, playerkingdompref[%s] = %s WHERE idname = %s;',
                pNumber, pID, pNumber, pReady, pNumber, pCommName, pNumber, pKingdomPref, roomID);
            pool.query(
                'UPDATE "GRIDs" SET playerid[$1] = $2, playerready[$3] = $4, playercommname[$5] = $6, playerkingdompref[$7] = $8 WHERE idname = $9;', [
                    parseInt(pNumber), pID, parseInt(pNumber), pReady, parseInt(pNumber), pCommName, parseInt(pNumber), pKingdomPref, roomID
                ],
                function (err, data) {
                    if (err) {
                        throw new Error(err + ' --- Error updating room ' + roomID + ' with new info');
                        //reject('failed to update lobbies');
                    }
                    logger.log('Room info updated');
                    resolve(logger.log('lobbies updated'));
                }).then(function () {
                pool.query('SELECT * FROM "GRIDs" WHERE idname = $1;', [roomID]).then(res => {
                        logger.log(JSON.stringify(res.rows[0]));
                        logger.log('Room info broadcasted');
                        socket.broadcast.to(roomID).emit('update lobby info', res.rows[0]);
                    })
                    .catch(e => {
                        logger.error('query error', e.message, e.stack);
                    });
            });
        });
    });

    socket.on('host leaves', function (roomID) {
        socket.broadcast.to(roomID).emit('dc by host');
        pool.query('DELETE FROM "GRIDs" WHERE idname=$1;', [roomID])
            .then(function () {
                logger.log('Room ' + roomID + ' deleted');
            })
            .catch(e => {
                logger.error('query error', e.message, e.stack);
            });
    });

    socket.on('client leaves', function (roomID) {
        //TODO: client leaving
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
