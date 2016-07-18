(function() {
  if (typeof BattleshipGame === 'undefined') {
    window.BattleshipGame = {};
  }
}());

var Game = BattleshipGame.Game = function($el) {
  this.$el = $el;
  this.board1 = new BattleshipGame.Board('player1');
  this.board2 = new BattleshipGame.Board('player2');
  this.currentPlayer = this.board1.player
  this.setupBoard(this.board1);
  this.setupBoard(this.board2);
  this.setupGame();
  this.handleGameClick = $('.board').click(function(e) {
    this.renderSinkShip($(e.target));
  }.bind(this));
};

Game.prototype.renderSinkShip = function($target) {
  var player = $target.closest('.board').attr('id');
  var row = $target.data('row');
  var col = $target.data('col');
  if ($target.closest('.board').attr('id') == this.currentPlayer) {
    return;
  }
  if (!($target.hasClass('sunk') || $target.hasClass('missed'))) {
    this.setCurrentPlayer();
  }
  if ($target.hasClass('ship')) {
    this.sinkShip(player, row, col);
    $('#' + player + ' .row-' + row + '.col-' + col).addClass('sunk');
  } else {
    $('#' + player + ' .row-' + row + '.col-' + col).addClass('missed');
  }
};

Game.prototype.setCurrentPlayer = function() {
  $('#player1, #player2').toggleClass('disabled');
  this.togglePlayer();
  this.playerTurnAnnouncement();
};

Game.prototype.togglePlayer = function() {
  if (this.currentPlayer === this.board1.player) {
    this.currentPlayer = this.board2.player;
  } else {
    this.currentPlayer = this.board1.player;
  }
};

Game.prototype.sinkShip = function(player, row, col) {
  board = (player === 'player1' ? this.board1 : this.board2);
  board.ships.forEach(function(ship) {
    ship.coords.forEach(function(coord, idx) {
      if (coord.toString() === col + "," + row) {
        ship.coords.splice(idx, 1);
        board.sinkShip();
        if (board.isDead()) {
          this.handleGameover();
        }
      }
    }.bind(this));
  }.bind(this));
  board.grid[col][row] = "sunk";
};

Game.prototype.handleGameover = function() {
  this.togglePlayer();
  $('.announcement').html(_humanizePlayer(this.currentPlayer) + " won!!");
  $('.board').addClass('disabled');
  this.handleGameClick.off();
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
    .append($('<div class="player-name">' + _humanizePlayer(board.player) + '</div>'))
    .append(this.blankBoard(board.player)));
  this.addShips(board);
};

_humanizePlayer = function(currentPlayer) {
  return (currentPlayer === 'player1' ? 'Player 1' : 'Player 2');
};

Game.prototype.playerTurnAnnouncement = function() {
  $('.announcement').html(_humanizePlayer(this.currentPlayer) + "'s turn");
};

Game.prototype.setupGame = function() {
  this.$el.prepend($('<div>')
          .addClass("announcement"));
  this.playerTurnAnnouncement();
  $('#player1').addClass('disabled');
  _toggleRevealShips();
};

Game.prototype.addShips = function(board) {
  board.ships.forEach(function(ship, idx) {
    ship.coords.forEach(function(coord) {
      $('#' + board.player + ' .cell.row-' + coord[1] + '.col-' + coord[0])
        .addClass('ship ship-' + idx);
    });
  });
};

_toggleRevealShips = function() {
  $('#show-ships').change(function() {
    if ($(this).is(':checked')) {
      $('.cell').addClass('show-ship');
    } else {
      $('.cell').removeClass('show-ship');
    }
  });
};

$(document).ready(function() {
  $('#reset-game').click(function() {
    $('#container').html('');
    $('#show-ships').prop('checked', false);
    new BattleshipGame.Game($('#container'));
  });
});
