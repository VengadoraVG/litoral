var ICharacter = (function () {

  var Instance = (function () {
    var update = function () {
    };

    var spawn = function (x,y) {
      this.revive();
      this.x = x;
      this.y = y;
    };

    return {
      update : update,
      spawn : spawn
    };
  })();

  var initialize = function (sprite) {
    if (!sprite.body) {
      game.physics.arcade.enable(sprite);
    }

    sprite.anchor.set(0.5, 1);
    sprite.updates = sprite.updates || [];
    sprite.updates.push(Instance.update);
    sprite.body.setSize(sprite.width, 20);
    sprite.speed = sprite.walkingSpeed = config.character.speed.walk;
    sprite.runningSpeed = config.character.speed.run;

    zOrder.putInLayer(sprite, 'ACTION');
  };

  return {
    Instance : Instance,
    initialize : initialize
  };
})();
