(function() {
  if (typeof BattleshipGame === 'undefined') {
    window.BattleshipGame = {};
  }
}());


var Game = BattleshipGame.Game = function($el) {
  this.$el = $el;
  this.board1 = new BattleshipGame.Board('player1');
  this.board2 = new BattleshipGame.Board('player2');
  this.setupBoard(this.board1);
  this.setupBoard(this.board2);
  $('.board').click(function(e) {
    this.sinkShip($(e.target));
  }.bind(this));
};

Game.prototype.sinkShip = function($target) {
  var player = $target.closest('.board').attr('id');
  var row = $target.data('row');
  var col = $target.data('col');
  if ($target.hasClass('ship')) {
    $('#' + player + ' .row-' + row + '.col-' + col).addClass('sunk');
  } else {
    $('#' + player + ' .row-' + row + '.col-' + col).addClass('missed');
  }
};

Game.prototype.blankBoard = function(player) {
  var board = $('<div>').addClass('board').attr('id', player);
  for(var i = 0; i < 10; i++) {
    var $row = $('<div class="row"></div>');
    for(var j = 0; j < 10; j++) {
      $row.append($('<div>').addClass('cell row-' + j + ' col-' + i).data('row', j).data('col', i));
    }
    board.append($row);
  }
  return board;
};

Game.prototype.setupBoard = function(board) {
  this.$el.before(this.blankBoard(board.player));
  this.addShips(board);
};

Game.prototype.addShips = function(board) {
  board.ships.forEach(function(ship) {
    ship.coords.forEach(function(coord) {
      $('#' + board.player + ' .cell.row-' + coord[1] + '.col-' + coord[0]).addClass('ship');
    });
  });
};
