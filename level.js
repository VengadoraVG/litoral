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
      var i;

      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.physics.arcade.gravity.set(0,config.world.gravity);
      inventory = Inventory.create(this);

      Question.spawn(this);
      Answer.spawn(this);
      Answer.initialize(this);
      this.qaMenu = QAMenu.create();
    };

    var update = function () {
      game.physics.arcade.collide(this.pc, this.tilemap.floor);
      Question.update();
      zOrder.sort();
      this.qaMenu.update();
    };

    var preload = function () {
      // inventory
      game.load.image('inventory-frame', 'assets/inventory-frame.png');
      game.load.image('selection-frame', 'assets/selection-frame.png');
      game.load.image('question', 'assets/question.png');
      game.load.image('answer', 'assets/answer.png');
      game.load.image('selected-question-frame',
                      'assets/selected-question-frame.png');
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
