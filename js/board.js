var Board = BattleshipGame.Board = function(player) {
  this.player = player;
  this.grid = _blankBoard();
  this.wounds = 0;
  this.generateShips();
};

Board.prototype.isDead = function() {
  if (this.wounds === 15) {
    return true;
  }
};

Board.prototype.sinkShip = function() {
  this.wounds++;
};

Board.prototype.generateShips = function() {
  this.ships = [];
  for (var i = 1; i <= 5; i++) {
    this.ships.push(new BattleshipGame.Ship(this.ships, i));
  }
};

_blankBoard = function() {
  var grid = [];
  for (var i = 0; i < 10; i++) {
    var row = [];
    for (var j = 0; j < 10; j++) {
      row.push('.');
    }
    grid.push(row);
  }
  return grid;
};
