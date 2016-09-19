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
app.get('/game', function (request, response) {
    response.render('pages/game');
});

io.on('connection', function (socket) {
    var userID = '';
    var emptyUID;
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
                    });
                });
            }
        });
    });

    socket.on('generate UID', function () {
        logger.log('Generate UID request received');
        new Promise(function (resolve, reject) {
            var possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            logger.log('UID generation started');
            //preventing the userID from growing 6 characters with each failed attempt
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
                            gameRoomID,
                            0,
                            ['', '', '', ''],
                            [0, 0, 0, 0],
                            ['', '', '', ''],
                            [0, 0, 0, 0]
                        ],
                        function (err, data) {
                            if (err) {
                                logger.error(err);
                                throw new Error('Error inserting game room ID ' + gameRoomID);
                            }
                        }).then(function () {
                            pool.query('SELECT * FROM "GRIDs" WHERE idname = $1;', [gameRoomID]).then(result => {
                                //first log here is triggered, but the second is not
                                logger.log('2nd select query started');
                                logger.log(result);
                                logger.log(result.rows);
                                logger.log(result.rows.playerid[parseInt(3)]);
                                emptyUID = result.playerid[parseInt(3)];
                                logger.log('emptyUID is: ' + emptyUID);
                            })
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
                    var pIndex;
                    logger.log(row.playerid);
                    for (var i = 0; i < 4; i++) {
                        logger.log(i);
                        logger.log(row.playerid[i]);
                        if (row.playerid[i] === '') {
                            pIndex = i;
                            break;
                        }
                    }
                    if (pIndex !== undefined) {
                        // pIndex + 1 since postgres is 1 indexed
                        pool.query('UPDATE "GRIDs" SET playerid[$1] = $2 WHERE idname = $3;', [pIndex + 1, UID, roomID], function (
                            err, data) {
                            if (err) {
                                throw new Error('Error adding ' + UID + ' to game room ' + roomID);
                            }
                        });
                        gameRoomID = roomID;
                        socket.join(roomID);
                        logger.log('pIndex ' + pIndex);
                        logger.log(JSON.stringify(row));
                        socket.emit('join lobby request accepted', pIndex, roomID, row, emptyUID);
                        socket.broadcast.to(roomID).emit('player joined lobby', pIndex);
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

    socket.on('update lobby info', function (roomID, pNumber, pID, pReady, pCommName, pKingdomPref, emptyUID) {
        logger.log('Room ID: ' + roomID + ', sent player number: ' + pNumber + ', sent player ID: ' + pID + ', sent player ready: ' + pReady +
            ', sent player commander: ' + pCommName + ', sent player kingdom preference: ' + pKingdomPref + ', emptyUID: ' + emptyUID + '.');
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
                    }
                    logger.log('Room info updated');
                    resolve(logger.log('lobbies updated'));
                }).then(function () {
                pool.query('SELECT * FROM "GRIDs" WHERE idname = $1;', [roomID]).then(res => {
                        logger.log(JSON.stringify(res.rows[0]));
                        logger.log('Room info broadcasted');
                        socket.broadcast.to(roomID).emit('update lobby info', res.rows[0], emptyUID);
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
    socket.on('client leaves', function (roomID, pNumber) {
        // Postgres is 1 indexed, up the index by 1 to translate
        pNumber++;
        pool.query(
            'UPDATE "GRIDs" SET playerid[$1] = $2, playerready[$3] = $4, playercommname[$5] = $6, playerkingdompref[$7] = $8 WHERE idname = $9;', [
                parseInt(pNumber), '', parseInt(pNumber), 0, parseInt(pNumber), '', parseInt(pNumber), 0, roomID
            ]).then(function () {
                socket.leave(roomID);
                logger.log('Player ' + pNumber + ' had left the room');
                pool.query('SELECT * FROM "GRIDs" WHERE idname = $1;', [roomID]).then(res => {
                    socket.broadcast.to(roomID).emit('update lobby info', res.rows[0]);
                })
                .catch(e => {
                    logger.error('query error', e.message, e.stack);
                });
            })
            .catch(e => {
                logger.error('query error', e.message, e.stack);
            });
    });

    socket.on('leave room', function (roomID) {
        socket.leave(roomID);
    });

    socket.on('start game', function (roomID) {
        response.render('pages/game');
    })

    socket.on('disconnect', function () {
        logger.log('User ' + userID + ' disconnected');
    });

    setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
});

process.on('SIGTERM', function () {
    logger.log('Shutting down.');
    if (io && io.socket) {
        io.socket.broadcast.send({
            type: 'error',
            msg: 'server disconnected with SIGTERM'
        });
    }
    //log says app.close is not a function
    app.close();
    process.exit(-1);
});
