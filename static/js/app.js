var socket = io();
var jsCookie = Cookies.noConflict();
var el = document.getElementById('serverTime');
var newsDate = '';
var newsContent = '';

var userID = '';
var roomID = '';
var playerNumber = -99;
var hostReady = false;
var nOfClientsReady = 0;
var commName = '';
var kingdomPref = 0;
var kingdomArray = ['any willing kingdom', 'Mantle', 'Minstral', 'Vacuo', 'Vale'];

socket.on('time', function (timeString) {
    el.innerHTML = 'Server time: ' + timeString;
});
socket.emit('news request');
socket.on('news', function (newsObject) {
    newsDate = newsObject.newsdate;
    newsContent = newsObject.newscontent;
    $('<tr></tr>').append('<td class=\'newsTime\'>' + newsDate + '</td><td class=\'newsContent\'>' + newsContent + '</td>').prependTo('#newsTable');
});

function testFunc() {
    document.getElementById('P2Status').innerHTML = '';
    document.getElementById('cLobbyInfoP2').style.visibility = 'visible';
}

function testFunc2() {
    document.getElementById('P2Status').innerHTML = 'Waiting for players again...';
    document.getElementById('cLobbyInfoP2').style.visibility = 'hidden';
}

function toTestersPage() {
    window.location.href = '/setTesters.html';
}

//hiding/showing windows
function hideAYSPrompt() {
    document.getElementById('AYSprompt').style.visibility = 'hidden';
    document.getElementById('overlay').style.backgroundColor = 'rgba(0,0,0,0)';
    document.getElementById('createJoinButton').disabled = false;
}

function hideNewGameSettings() {
    document.getElementById('newGameSettings').style.visibility = 'hidden';
    document.getElementById('overlay').style.backgroundColor = 'rgba(0,0,0,0)';
    document.getElementById('createJoinButton').disabled = false;
}

function hideJoinNewGame() {
    document.getElementById('joinNewGame').style.visibility = 'hidden';
    document.getElementById('overlay').style.backgroundColor = 'rgba(0,0,0,0)';
    document.getElementById('createJoinButton').disabled = false;
}

function hideHostLobby() {
    document.getElementById('hostLobby').style.visibility = 'hidden';
    document.getElementById('overlay').style.backgroundColor = 'rgba(0,0,0,0)';
    document.getElementById('createJoinButton').disabled = false;
}

function hideClientLobby() {
    document.getElementById('clientLobby').style.visibility = 'hidden';
    document.getElementById('overlay').style.backgroundColor = 'rgba(0,0,0,0)';
    document.getElementById('createJoinButton').disabled = false;
}

function showAYSPrompt() {
    document.getElementById('AYSprompt').style.visibility = 'visible';
    document.getElementById('overlay').style.backgroundColor = 'rgba(0,0,0,0.5)';
    document.getElementById('createJoinButton').disabled = true;
}

function showNewGameSettings() {
    document.getElementById('newGameSettings').style.visibility = 'visible';
    document.getElementById('overlay').style.backgroundColor = 'rgba(0,0,0,0.5)';
    document.getElementById('createJoinButton').disabled = true;
}

function showJoinNewGame() {
    document.getElementById('joinNewGame').style.visibility = 'visible';
    document.getElementById('overlay').style.backgroundColor = 'rgba(0,0,0,0.5)';
    document.getElementById('createJoinButton').disabled = true;
}

function showHostLobby() {
    document.getElementById('hostLobby').style.visibility = 'visible';
    document.getElementById('overlay').style.backgroundColor = 'rgba(0,0,0,0.5)';
    document.getElementById('createJoinButton').disabled = true;
}

function showClientLobby() {
    document.getElementById('clientLobby').style.visibility = 'visible';
    document.getElementById('overlay').style.backgroundColor = 'rgba(0,0,0,0.5)';
    document.getElementById('createJoinButton').disabled = true;
}

function generateUID() {
    socket.emit('generate UID');
    console.log('generate UID request sent');
}
socket.on('return generated UID', function (UID) {
    userID = UID;
    jsCookie.set('rtgUID', userID, {
        expires: 365
    });
    console.log('Your new ID is ' + jsCookie.get('rtgUID'));
});

function newGameWarning() {
    /*if (cookieHasUnfinishedGame == true) {
                var AYStext = "You are about to start a new game, but still have\n\ran unfinished saved game. By starting a new game,\n\ryour previous saved game will be replaced.\n\r\n\rPlease confirm you want to do this by typing\n\r\"Clear saved game\"\n\rand choosing to create or join a new game.";
                if (consent === 'Clear saved game') {*/
    /*};
                } else {
                    var AYStext = 'Please select whether to host a new game (Create game) or join an already hosted game based on a room code received from the host (Join game).';
                    document.getElementById('AYStextField').innerHTML = AYStext;
                    showAYSPrompt();
                };*/
    var AYStext =
        'TEMPORARY TEXT<br>Please select whether to host a new game (Create game) or join an already hosted game based on a room code received from the host (Join game).';
    document.getElementById('AYStextField').innerHTML = AYStext;
    showAYSPrompt();
}

function newGameSettings() {
    hideAYSPrompt();
    showNewGameSettings();
    /*if (document.getElementById('comName').value.length > 3) {
                    console.log('Your commander is ' + document.getElementById('comName').value);

                } else {
                    console.log('Your commander name must be at least 4 characters long');
                }*/
}

function joinNewGame() {
    hideAYSPrompt();
    showJoinNewGame();
}

function roomCodeCheck() {
    socket.emit('join lobby request', document.getElementById('roomCode').value, userID);
}

function joinLobby() {
    hideJoinNewGame();
    showClientLobby();
}

function createLobby() {
    hideNewGameSettings();
    generateGRID();
}

function generateGRID() {
    socket.emit('generate GRID');
    console.log('generate GRID request sent');
}
socket.on('return generated GRID', function (gameRoomID) {
    jsCookie.set('rtgLastGame', gameRoomID, {
        expires: 365
    });
    console.log('Your room code is ' + jsCookie.get('rtgLastGame'));
    document.getElementById('givenRoomCode').value = gameRoomID;
    roomID = gameRoomID;
    playerNumber = 0;
    showHostLobby();
    hPlayerNotReady();
});

//pre-game player status
function hPlayerReady() {
    hostReady = true;
    if (nOfClientsReady == 3) {
        document.getElementById('startGameButton').disabled = false;
    }
    commName = document.getElementById('CommName0').value;
    kingdomPref = document.getElementById('KingdomPref0').value;
    document.getElementById('hLobbySlot0')
        .innerHTML = 'Commander ' + commName + ', attempting command of ' + kingdomArray[kingdomPref] +
        ' is ready for war <button id="notReadyP0" onclick="hPlayerNotReady()">X</button>';
    socket.emit('update lobby info', roomID, playerNumber, userID, 1, commName, kingdomPref);
}

function hPlayerNotReady() {
    hostReady = false;
    document.getElementById('hLobbySlot0')
        .innerHTML = '<div id="LobbyInfoP0">Commander name: <input id="CommName0" type="text" name="commanderName0" maxlength="15" value="' + commName + '">' +
        ' <select name="kingdomPref0" id="KingdomPref0"><option value=0>Random</option><option value=1>Mantle</option><option value=2>Minstral</option>' +
        '<option value=3>Vacuo</option><option value=4>Vale</option></select> <button id="readyP1" onclick="hPlayerReady()">V</button></div>';
    document.getElementById('KingdomPref0').selectedIndex = kingdomPref;
    document.getElementById('startGameButton').disabled = true;
    socket.emit('update lobby info', roomID, playerNumber, userID, 0, commName, kingdomPref);
}

function cPlayerReady() {
    commName = document.getElementById('CommName' + playerNumber.toString()).value;
    kingdomPref = document.getElementById('KingdomPref' + playerNumber.toString()).value;
    document.getElementById('cLobbySlot' + playerNumber.toString())
        .innerHTML = 'Commander ' + commName + ', attempting command of ' + kingdomArray[kingdomPref] +
        ' is ready for war <button id="notReadyP' + playerNumber.toString() + '" onclick="cPlayerNotReady()">X</button>';
    socket.emit('update lobby info', roomID, playerNumber, userID, 1, commName, kingdomPref);
}

function cPlayerNotReady() {
    document.getElementById('cLobbySlot' + playerNumber.toString())
        .innerHTML = '<div id="LobbyInfoP' + playerNumber.toString() + '">Commander name: <input id="CommName' +
        playerNumber.toString() + '" type="text" name="commanderName" maxlength="15" value="' + commName + '"> <select name="kingdomPref" id="KingdomPref' +
        playerNumber.toString() + '" value="' + kingdomPref + '">' +
        '<option value=0>Random</option><option value=1>Mantle</option><option value=2>Minstral</option><option value=3>Vacuo</option><option value=4>Vale</option></select>' +
        '<button id="readyP' + playerNumber.toString() + '" onclick="cPlayerReady()">V</button></div>';
    document.getElementById('KingdomPref' + playerNumber.toString()).selectedIndex = kingdomPref;
    socket.emit('update lobby info', roomID, playerNumber, userID, 0, commName, kingdomPref);
}

socket.on('join lobby request accepted', function (pNumber, sentRoomID, gameInfoObj, emptyUID) {
    playerNumber = pNumber;
    roomID = sentRoomID;
    joinLobby();
    document.getElementById('cLobbySlot' + playerNumber.toString())
        .innerHTML = '<div id="LobbyInfoP' + playerNumber.toString() + '">Commander name: <input id="CommName' +
        playerNumber.toString() + '" type="text" name="commanderName" maxlength="15" value="' + commName + '"> <select name="kingdomPref" id="KingdomPref' +
        playerNumber.toString() + '" value="' + kingdomPref + '">' +
        '<option value=0>Random</option><option value=1>Mantle</option><option value=2>Minstral</option><option value=3>Vacuo</option><option value=4>Vale</option></select>' +
        '<button id="readyP' + playerNumber.toString() + '" onclick="cPlayerReady()">V</button></div>';
    for (var i = 0; i < 4; i++) {
        if (playerNumber !== i) {
            if (gameInfoObj.playerid[i] !== '\'\'' || gameInfoObj.playerid[i] !== '\"\"' || gameInfoObj.playerid[i] !== '' || gameInfoObj.playerid[i] !== null || gameInfoObj.playerid[i] !== undefined || gameInfoObj.playerid[i] !== emptyUID) {
                if (gameInfoObj.playerready[i] === 0 || gameInfoObj.playerready[i] === null) {
                    document.getElementById('cLobbySlot' + i).innerHTML = 'Waiting for player to get ready...';
                } else {
                    document.getElementById('cLobbySlot' + i).innerHTML = 'Commander ' + gameInfoObj.playercommname[i] + ', attempting command of ' +
                        kingdomArray[
                            gameInfoObj.playerkingdompref[i]] + ' is ready for war';
                }
            } else {
                document.getElementById('cLobbySlot' + i).innerHTML = 'Waiting for player to join...';
            }
        }
    }
});
socket.on('player joined lobby', function (newPlayerNumber) {
    if (playerNumber === 0) {
        document.getElementById('hLobbySlot' + newPlayerNumber).innerHTML = 'Player joined. Waiting for them to get ready...';
    } else {
        document.getElementById('cLobbySlot' + newPlayerNumber).innerHTML = 'Player joined. Waiting for them to get ready...';
    }
});
socket.on('update lobby info', function (gameInfoObj, emptyUID) {
    console.log(JSON.stringify(gameInfoObj));
    nOfClientsReady = 0;
    console.log('emptyUID is ' + emptyUID + '.');
    for (var i = 0; i < 4; i++) {
        //Don't update your own information, which is done locally
        if (playerNumber !== i) {
            //Check if there is a player in this slot
            console.log('Player ' + i + ': ' + gameInfoObj.playerid[i] + '.');
            //PROBLEM: the following if statement doesn't trigger the else when a client connects
            if (gameInfoObj.playerid[i] !== '\'\'' || gameInfoObj.playerid[i] !== '\"\"' || gameInfoObj.playerid[i] !== '' || gameInfoObj.playerid[i] !== null || gameInfoObj.playerid[i] !== undefined || gameInfoObj.playerid[i] !== emptyUID) {
                //Check if you are the host
                if (playerNumber === 0) {
                    console.log('Waiting for player ' + i + ' to get ready');
                    if (gameInfoObj.playerready[i] === 0 || gameInfoObj.playerready[i] === null) {
                        document.getElementById('hLobbySlot' + i).innerHTML = 'Waiting for player to get ready...';
                    } else {
                        nOfClientsReady++
                        console.log(nOfClientsReady + ' player(s) are ready to start')
                        document.getElementById('hLobbySlot' + i).innerHTML = 'Commander ' + gameInfoObj.playercommname[i] + ', attempting command of ' +
                            kingdomArray[
                                gameInfoObj.playerkingdompref[i]] + ' is ready for war';
                    }
                } else {
                    if (gameInfoObj.playerready[i] === 0 || gameInfoObj.playerready[i] === null) {
                        document.getElementById('cLobbySlot' + i).innerHTML = 'Waiting for player to get ready...';
                    } else {
                        document.getElementById('cLobbySlot' + i).innerHTML = 'Commander ' + gameInfoObj.playercommname[i] + ', attempting command of ' +
                            kingdomArray[
                                gameInfoObj.playerkingdompref[i]] + ' is ready for war';
                    }
                }
            } else {
                if (playerNumber === 0) {
                    console.log('Waiting for player ' + i + ' to join');
                    document.getElementById('hLobbySlot' + i).innerHTML = 'Waiting for player to join...';
                } else {
                    console.log('Waiting for player ' + i + ' to join');
                    document.getElementById('cLobbySlot' + i).innerHTML = 'Waiting for player to join...';
                }
            }
        }
    }
    if (nOfClientsReady == 3 && hostReady == true) {
        document.getElementById('startGameButton').disabled = false;
    } else {
        document.getElementById('startGameButton').disabled = true;
    };
});

//joining/leaving lobbies
function hostLeave() {
    hideHostLobby();
    socket.emit('host leaves', roomID);
    roomID = '';
    playerNumber = -99;
    commName = '';
    kingdomPref = 0;
}

function clientLeave() {
    hideClientLobby();
    socket.emit('client leaves', roomID, playerNumber);
    roomID = '';
    playerNumber = -99;
    commName = '';
    kingdomPref = 0;
}

socket.on('dc by host', function () {
    socket.emit('leave room', roomID);
    hideClientLobby();
    roomID = '';
    playerNumber = -99;
    commName = '';
    kingdomPref = 0;
    alert('Host has left the lobby.');
});

socket.on('room full', function () {
    hideJoinNewGame();
    alert('This room is full.');
});

function startGameButton() {
    console.log('Starting game!');
    socket.emit('start game', roomID);
}

socket.on('game already started', function () {
    hideJoinNewGame();
    alert('This game is already in progress.');
});

$(document).ready(function () {
    //UserID is checked or generated
    function checkCookie() {
        userID = jsCookie.get('rtgUID');
        if (userID !== undefined) {
            console.log('User ' + userID + ' is connected.');
            socket.emit('existing user connection', userID);
        } else {
            console.log('New user connected. ID will be generated.');
            generateUID();
        }
    }
    checkCookie();

    hideAYSPrompt();
    hideNewGameSettings();
    hideJoinNewGame();
    hideHostLobby();
    hideClientLobby();
});
