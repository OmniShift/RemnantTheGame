var socket = io();

//the following values are placeholders to be received from the server on page initialization
var commName = ['Ruby Rose', 'Weiss Schnee', 'Blake Belladonna', 'Yang Xiao-Long'];
var kingdom = [0, 1, 2, 3];
var kingdomArray = ['Mantle', 'Minstral', 'Vacuo', 'Vale'];
//playerNumber is directly used as index, so ranges from 0 to 3
var playerNumber = 1;

$(document).ready(function () {
    document.getElementById('overlay').style.backgroundColor = 'rgba(0,0,0,0)';
    //getElementById('gameBoard').
    //create 3 divs, 1 for each player in order after the client's player's turn
    var tempPlayer = -1;
    //for some unknown reason, nothing is appended, even without the attr
    $('<div>supertext</div>').attr({
        /*id: 'player' + tempPlayer + 'Area',
        'class': 'otherPlayerArea',*/
        width: 200,
        height: 400,
        background-color: red
    }).appendTo('#otherPlayers');
    for (var i = 1; i < 4; i++) {
        if ((playerNumber + i) > 3) {
            /*tempPlayer++;
            var focusElement = document.getElementById('otherPlayers');
            var endElement = document.getElementById('dummyEndDivOP');
            var newElement = document.createElement('div');
            newElement.id = 'player' + tempPlayer + 'Area';
            newElement.className = 'otherPlayerArea';
            document.focusElement.insertBefore(newElement, endElement);*/
        }
    }
}