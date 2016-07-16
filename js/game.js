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
    this.renderSinkShip($(e.target));
  }.bind(this));
};

Game.prototype.renderSinkShip = function($target) {
  var player = $target.closest('.board').attr('id');
  var row = $target.data('row');
  var col = $target.data('col');
  if ($target.hasClass('ship')) {
    this.sinkShip(player, row, col);
    $('#' + player + ' .row-' + row + '.col-' + col).addClass('sunk');
  } else {
    $('#' + player + ' .row-' + row + '.col-' + col).addClass('missed');
  }
};

Game.prototype.sinkShip = function(player, row, col) {
  board = (player === 'player1' ? this.board1 : this.board2);
  board.ships.forEach(function(ship) {
    ship.coords.forEach(function(coord, idx) {
      if (coord.toString() === col + "," + row) {
        // selects ship to sink
        ship.coords.splice(idx, 1);
        board.sinkShip();
        if (board.isDead()) {
          alert(board.player + " dead!");
        }
      }
    });
  });
  board.grid[col][row] = "sunk";
};

Game.prototype.blankBoard = function(player) {
  var board = $('<div>').addClass('board').attr('id', player);
  for(var i = 0; i < 10; i++) {
    var $row = $('<div class="row"></div>');
    for(var j = 0; j < 10; j++) {
      $row.append($('<div>')
        .addClass('cell row-' + j + ' col-' + i)
        .data('row', j).data('col', i));
    }
    board.append($row);
  }
  return board;
};

Game.prototype.setupBoard = function(board) {
  this.$el.append($('<div>')
    .addClass('player')
    .append($('<div class="player-name">' + board.player + '</div>'))
    .append(this.blankBoard(board.player)));
  this.addShips(board);
};

Game.prototype.addShips = function(board) {
  board.ships.forEach(function(ship, idx) {
    ship.coords.forEach(function(coord) {
      $('#' + board.player + ' .cell.row-' + coord[1] + '.col-' + coord[0])
        .addClass('ship ship-' + idx);
    });
  });
};
