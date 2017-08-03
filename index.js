const fs = require('fs');
const path = require('path');
const url = require('url');
const logger = require('tracer').colorConsole();

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
//var socket = io();

app.set('port', (process.env.PORT || 5000));
server.listen(app.get('port'), function () {
    logger.log('Node app is running on port', app.get('port'));
});

app.use(express.static(__dirname + '/static'));

//alternative method, untested
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
    logger.log('on main page');
});
app.get('/', function (request, response) {
    response.render('pages/index');
    logger.log('on main page');
});
app.get('/game.html', function (request, response) {
    response.render('/game.html');
    logger.log('on game page');
});
app.get('/game.html', function (request, response) {
    response.sendFile(__dirname + '/game.html');
    logger.log('on game page');
});
io.on('next turn', function (a, b) {
    logger.log('next turn()');
});