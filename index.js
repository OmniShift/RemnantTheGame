const fs = require('fs');
const path = require('path');
const url = require('url');
const logger = require('tracer').colorConsole();

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