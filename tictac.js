// var makeBoard = function() {
//   var board = [];
//   for (var j = 0; j < 3; j++) {
//     var row = [];
//     for (var i = 0; i < 3; i++) {
//       row.push('*');
//     }
//     board.push(row);

//   }

//   return board;
// };
// console.log(makeBoard());

// [
//   [ , , ], 
//   [ , , ], 
//   [ , , ]
// ];

var Player = function() {

};

var Game = function() {
  this.board = this.makeBoard();
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

var game = new Game();
console.log(game.board);

