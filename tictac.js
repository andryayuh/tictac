var prompt = require('readline-sync');

var TTT = function() {
  this.board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  this.player = 'x';
  this.moves = 0;
};

TTT.prototype.printBoard = function() {
  console.log(`${this.board[0][0]} | ${this.board[0][1]} | ${this.board[0][2]}`);
  console.log(`${this.board[1][0]} | ${this.board[1][1]} | ${this.board[1][2]}`);
  console.log(`${this.board[2][0]} | ${this.board[2][1]} | ${this.board[2][2]}`);
};

TTT.prototype.placeMove = function(row, col) {
  this.board[row][col] = this.player;
  this.moves++;
};

TTT.prototype.switchPlayer = function() {
  this.player = this.player === 'x' ? 'o' : 'x';
};

TTT.prototype.convertToRowCol = function(move) {
  var row = Math.floor((move - 1) / 3);
  var col = (move - 1) % 3;
  return {row, col};
};


// ~~~~~~~~~~~~~ check valid move ~~~~~~~~~~~
TTT.prototype.isInvalidMove = function(move) {
  move = Number(move); // !! essencial bc prompt comes in as string;

  if (move < 1 && move > 9) { 
    this.printInvalidMsg('choose a number from 0-9');
    return true;
  } else if (Math.floor(move) !== move) {
    this.printInvalidMsg('choose an integer');
    return true;
  } else if (this.isPositionOccupied(move)) {
    this.printInvalidMsg('that spot is occupied'); 
    return true;   
  }
  return false;
};

TTT.prototype.isPositionOccupied = function(move) {
  // convert move to row col
  var {row, col} = this.convertToRowCol(move);
  return typeof this.board[row][col] === 'string';
};

TTT.prototype.printInvalidMsg = function(msg) {
  console.log('Invalid input:', msg);
};


// ~~~~~~~~~~~~~ ^^^^ check valid move ~~~~~~~~~~~



// ~~~~~~~ check winner~~~~~~~~~

TTT.prototype.areAllEqual = function(a, b, c) {
  return a === b && b === c;
};

TTT.prototype.isRowWinner = function(row) {
  return this.areAllEqual(this.board[row][0], this.board[row][1], this.board[row][2]);
};

TTT.prototype.isColWinner = function(col) {
  return this.areAllEqual(this.board[0][col], this.board[1][col], this.board[2][col]);
};

TTT.prototype.isDiagonalWinner = function() {
  return this.areAllEqual(this.board[0][0], this.board[1][1], this.board[2][2]) || this.areAllEqual(this.board[0][2], this.board[1][1], this.board[2][0]);
};

TTT.prototype.isWinner = function(row, col) {
  return this.isRowWinner(row) || this.isColWinner(col) || this.isDiagonalWinner();
};

TTT.prototype.printWinner = function() {
  console.log( `Congrats ${this.player}, you won!`);
};
// ~~~~~~~check winner~~~~~~~~~


// ~~~~ check DRAW ~~~~~~

TTT.prototype.isDraw = function() {
  return this.moves === 9;
};

TTT.prototype.printDraw = function() {
  console.log('It\'s a draw!');
};

// ~~~~ ^^ check draw DRAW ~~~~~~


TTT.prototype.promptPlayerMove = function() {
  var move;
  do {
    move = prompt.question(`player ${this.player}: input your move (1-9): `);
  } while (this.isInvalidMove(move));
  return this.convertToRowCol(move); 
  // use convertToRowCol here instead of play to reduce lines
};

TTT.prototype.play = function() {
  this.printBoard();
  var {row, col} = this.promptPlayerMove();
  this.placeMove(row, col); 
  if (this.isDraw()) {
    return this.printDraw();
  } else if (this.isWinner(row, col)) {
    this.printWinner();
  } else {
    this.switchPlayer();
    this.play();
    
  }
};

// essential, create instance of my object
var game = new TTT();
game.play();
















