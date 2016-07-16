var Ship = BattleshipGame.Ship = function(ships, length) {
  this.ships = ships;
  this.length = length;
  this.direction = ['vertical', 'horizontal'][_pickOne()];
  this.coords = _generateValidShip(this.length, this.direction, this.ships);
};

Ship.prototype.tryToSink = function() {

};

_pickOne = function() {
  return Math.round(Math.random());
};

_getRandomInt = function() {
  return Math.ceil(Math.random() * (9 - 0) + 0);
};

_generateValidShip = function(length, direction, otherShips) {
  // generate potential ship
  var potentialCoords = _generatePotentialShip(length, direction);

  // keep checking if ship is within bounds, and keep resetting ship until it is within bounds
  while (!_coordsAreInBounds(potentialCoords, otherShips)) {
    potentialCoords = _generatePotentialShip(length, direction);
  }

  return potentialCoords;
};

_coordsAreInBounds = function(potentialCoords, otherShips) {
  var takenSpots = [];
  otherShips.forEach(function(ship) {
    takenSpots = takenSpots.concat(ship.coords);
  });

  var valid = true;
  potentialCoords.forEach(function(coord) {
    if (coord[0] > 9 || coord[1] > 9) {
      valid = false;
      return;
    }
    takenSpots.forEach(function(takenCoord) {
      if (takenCoord.toString() == coord.toString()) {
        valid = false;
        return;
      }
    });
  });
  return valid;
};

_generatePotentialShip = function(length, direction) {
  var potentialStartPointX = _getRandomInt();
  var potentialStartPointY = _getRandomInt();
  var potentialCoords = [[potentialStartPointX, potentialStartPointY]];
  var newVal;

  if (direction === 'vertical') {
    newVal = potentialStartPointX + 1;
    while (potentialCoords.length < length) {
      potentialCoords.push([newVal++, potentialStartPointY]);
    }
  } else {
    newVal = potentialStartPointY + 1;
    while (potentialCoords.length < length) {
      potentialCoords.push([potentialStartPointX, newVal++]);
    }
  }
  return potentialCoords;
};
