var Omar = (function () {

  var Instance = (function () {
    var update = function () {
      util.execute(this.updates, this);
    };

    var spawn = function (x) {
      var floor = this.level.tilemap.findFloor(x),
          // a + (b-a)/2 = a(1-1/2) + b/2 = 1/2(a + b)
          y = ((floor.superior + floor.inferior)/2);

      ICharacter.Instance.spawn.call(this, x, y);
    };

    return {
      update : update,
      spawn : spawn
    };
  })();

  var create = function (lvl) {
    var omar = game.add.sprite(100,100, 'omar');    
    util.expand(omar, [ICharacter, IPlayerCharacter]);

    omar.level = lvl;

    omar.update = Instance.update;
    omar.spawn = Instance.spawn;
    
    omar.spawn(5*20);
    omar.body.collideWorldBounds = true;
    
    omar.animations.add('stand', [0,1,1,1,0,0,0,0,0,0,0
                                  ,1,1,1,0,3,4,3,0,0,0], 6, true);
    omar.animations.add('tired', [0,1,2,2,2,1,0,0,0,0,0
                                  ,1,2,2,2,1,0,3,4,3,0], 12, true);
    omar.animations.add('sprint', [6,7,7,6,5,5], 8, true);
    omar.animations.add('walk', [9,10,10,9,8,8], 6, true);
    omar.animations.play('walk');
    
    game.camera.follow(omar);

    return omar;
  };

  return {
    create : create
  };
})();
