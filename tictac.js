var prompt = require('prompt');
// [
//   [ , , ], 
//   [ , , ], 
//   [ , , ]
// ];

prompt.start();
var onErr = function(err) {
  console.log(err);
  return 1;
};

var Game = function() {
  this.board = this.makeBoard();
  // this.players = [1, 2];
  // this.sign = ['x', 'o'];
  this.players = {1: 'x', 2: 'o'};
  this.currentPlayer = 2;
};

Game.prototype.makeBoard = function() {
  var board = [];
  for (var j = 0; j < 3; j++) {
    var row = [];
    for (var i = 0; i < 3; i++) {
      row.push('*');
    }
    board.push(row);

  }

  return board;
};

// initialize
var game = new Game();

Game.prototype.turn = function() {
  prompt.get(['row', 'cell'], (err, result) => {
    if (err) { return onErr(err); }
    console.log('row: ', result.row);
    console.log('cell: ', result.cell);
    if (this.currentPlayer === 1) {
      this.board[result.row][result.cell] = this.players[1];
      console.log(this.board); // has to go inside prompt.get()
      this.currentPlayer = 2;
    } else {
      this.board[result.row][result.cell] = this.players[2];
      console.log(this.board); // has to go inside prompt.get()
      this.currentPlayer = 1;
    }
  });
};

// p1 turn
game.turn();
// game.turn(); // weird repeat input if do two in a row


// console.log(game.board);

// Game.prototype.winner = function() 




