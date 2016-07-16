var Ship = BattleshipGame.Ship = function(ships, length) {
  this.ships = ships;
  this.length = length;
  this.direction = ['vertical', 'horizontal'][_pickOne()];
  this.coords = this.generateValidShip();
};

Ship.prototype.generateValidShip = function() {
  do {
    potentialCoords = this.generatePotentialShip();
  } while (!this.areCoordsValid(potentialCoords));
  return potentialCoords;
};

Ship.prototype.areCoordsValid = function(potentialCoords) {
  var takenSpots = [];
  this.ships.forEach(function(ship) {
    takenSpots = takenSpots.concat(ship.coords);
  });

  var valid = true;
  potentialCoords.forEach(function(coord) {
    if (!valid) return;
    if (coord[0] > 9 || coord[1] > 9) {
      valid = false;
      return;
    }
    takenSpots.forEach(function(takenCoord) {
      if (!valid) return;
      if (takenCoord.toString() == coord.toString()) {
        valid = false;
        return;
      }
    });
  });
  return valid;
};

Ship.prototype.generatePotentialShip = function() {
  var potentialStartPointX = _getRandomInt();
  var potentialStartPointY = _getRandomInt();
  var potentialCoords = [[potentialStartPointX, potentialStartPointY]];
  var newVal;

  if (this.direction === 'vertical') {
    newVal = potentialStartPointX + 1;
    while (potentialCoords.length < this.length) {
      potentialCoords.push([newVal++, potentialStartPointY]);
    }
  } else {
    newVal = potentialStartPointY + 1;
    while (potentialCoords.length < this.length) {
      potentialCoords.push([potentialStartPointX, newVal++]);
    }
  }
  return potentialCoords;
};

_pickOne = function() {
  return Math.round(Math.random());
};

_getRandomInt = function() {
  return Math.floor(Math.random() * (10 - 0) + 0);
};
