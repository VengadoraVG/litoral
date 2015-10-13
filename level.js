var ILevel = (function () {
  var Instance = (function () {
    var inventory;

    var setPc = function (pc) {
      this.pc = pc;
      this.pc.inventory = inventory;
    };

    var setMap = function (map) {
      this.tilemap = map;
    };    

    var create = function () {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.physics.arcade.gravity.set(0,config.world.gravity);
      inventory = Inventory.create(this);
    };

    var update = function () {
      game.physics.arcade.collide(this.pc, this.tilemap.floor);
      zOrder.sort();
    };

    var preload = function () {
      // inventory
      game.load.image('inventory-frame', 'assets/inventory-frame.png');
      game.load.image('selection-frame', 'assets/selection-frame.png');
    };

    return {
      setPc : setPc,
      setMap : setMap,

      create : create,
      update : update,
      preload : preload
    };
  })();

  var initialize = function (level) {
    level.setPc = Instance.setPc;
    level.setMap = Instance.setMap;

    level.creates = level.creates || [];
    level.creates.push(Instance.create);

    level.updates = level.updates || [];
    level.updates.push(Instance.update);

    level.preloads = level.preloads || [];
    level.preloads.push(Instance.preload);
  };

  return {
    initialize : initialize
  };
})();
