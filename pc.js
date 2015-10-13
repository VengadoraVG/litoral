var IPlayerCharacter = (function () {
  var Instance = (function () {
    var update = function () {
      var direction = [0,0],
          animation = this.animations.currentAnim.name;;

      if (this.keys.up.isDown) {
        direction[Y] -= 1;
      }

      if (this.keys.down.isDown) {
        direction[Y] += 1;
      }

      if (this.keys.right.isDown) {
        direction[X] += 1;
        this.scale.x = 1;
      }

      if (this.keys.left.isDown) {
        direction[X] -= 1;
        this.scale.x = -1;
      }

      if (this.keys.sprint.isDown) {
        this.speed = this.runningSpeed;
      } else {
        this.speed = this.walkingSpeed;
      }

      direction = dot.unitVector(direction);
      this.body.velocity.x = direction[X] * this.speed;
      this.body.velocity.y = direction[Y] * this.speed

      if (Math.round(direction[X]) !== 0 ||
          Math.round(direction[Y]) !== 0) {
        if (this.keys.sprint.isDown) {
          util.safePlay(this, 'sprint');
        } else {
          util.safePlay(this, 'walk');
        }
      } else {
        util.safePlay(this, 'stand');
      }
    };

    return {
      update : update
    };
  })();

  var initialize = function (character) {
    character.keys = game.input.keyboard.createCursorKeys();
    character.keys.action =
      game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    character.keys.sprint =
      game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
    character.updates = character.updates || [];
    character.updates.push(Instance.update);
  };

  return {
    initialize : initialize
  };
})();
