var batallaDeCalama = (function () {
  var preload = function () {
    util.execute(this.preloads, this);
    game.load.spritesheet('omar', 'assets/omar-quispe.png', 50,70);
    game.load.spritesheet('corpose', 'assets/corpose.png', 70,50);
    game.load.spritesheet('bolivia-corpose',
                          'assets/bolivia/corpose.png', 70,50);
    game.load.spritesheet('chile-corpose',
                          'assets/chile/corpose.png', 70,50);
    game.load.spritesheet('food', 'assets/food.png', 48,48);
    game.load.spritesheet('water', 'assets/water.png', 48,48);

    game.load.tilemap('battlefield', 'assets/batalla-de-calama.json',
                      null, Phaser.Tilemap.TILED_JSON);

    game.load.image('terrain', 'assets/terrain.png');
    game.load.image('sky', 'assets/sky.png');
    game.load.image('mountains', 'assets/mountains.png');
    game.load.image('floor', 'assets/floor.png');
    game.load.image('front-floor', 'assets/front-floor.png');
  };

  var create = function () {
    util.execute(this.creates, this);
    game.stage.backgroundColor = "#999";

    var map = game.add.tilemap('battlefield', 20, 20, 780*20, 48*20);
    map.addTilesetImage('terrain');
    util.expand(map, [IMap]);
    this.setMap(map);

    var omar = Omar.create(this);
    this.setPc(omar);

    var graphicEnvorinment = Parallax.create(map);

    Corpose.createAll(config.batallaDeCalama.corposes, this);
    // Corpose.enableLvlEditor(this);
  };

  var update = function () {
    util.execute(this.updates, this);
  };

  return {
    preload : preload,
    create : create,
    update : update
  };
})();

util.expand(batallaDeCalama, [ILevel]);
