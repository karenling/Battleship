var Board = BattleshipGame.Board = function() {
  this.grid = _blankBoard();
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

Board.prototype.render = function() {
  this.grid.forEach(function(row) {
    console.log(row);
  });
};
