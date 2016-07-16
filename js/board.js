var Board = BattleshipGame.Board = function(player) {
  this.player = player;
  this.grid = _blankBoard();
  this.generateShips();
};

_blankBoard = function() {
  var grid = [];
  for(var i = 0; i < 10; i++) {
    var row = [];
    for (var j = 0; j < 10; j++) {
      row.push('.');
    }
    grid.push(row);
  }
  return grid;
};

Board.prototype.generateShips = function() {
  this.ships = [];
  for(var i=1; i <= 5; i++) {
    this.ships.push(new BattleshipGame.Ship(this.ships, i));
  }
};

Board.prototype.render = function() {
  // generate each ship and print it out
  this.ships.forEach(function(ship) {
    ship.coords.forEach(function(coord) {
      this.grid[coord[0]][coord[1]] = "x";
    }.bind(this));
  }.bind(this));

  this.grid.forEach(function(row) {
    console.log(row);
  });
};
