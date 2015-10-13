var IMap = (function () {
  var Instance = (function () {
    var findFloor = function (x) {
      var y = 0,
          tile,
          floor = {};

      x /= 20;

      for (; y<game.world.height/20; y++) {
        tile = this.getTile(x,y);
        if (!floor.inferior && tile && tile.index === 2) {
          floor.inferior = y*20;
        }
        
        if (!tile || tile.index === 1) {
          floor.superior = (y-1)*20;
          break;
        }
      }

      return floor;
    }

    return {
      findFloor : findFloor
    };
  })();

  var initialize = function (map) {
    map.floor = map.createLayer('floor');
    map.floor.resizeWorld();
    game.physics.arcade.enable(map.floor);
    map.setCollisionByExclusion([0,2], true, map.floor);

    zOrder.putInLayer(map.floor, 'HIDDEN');

    util.inheritFunctions(map, Instance);
  };

  return {
    initialize : initialize,
  };
})();
