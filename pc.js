var IPlayerCharacter = (function () {
  var Instance = (function () {
    var directionUpdate = function () {
      var direction = [0,0];

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
      direction = dot.unitVector(direction);
      this.body.velocity.x = direction[X] * this.speed;
      this.body.velocity.y = direction[Y] * this.speed
    };
    var sprintUpdate = function () {
      if (this.keys.sprint.isDown) {
        this.speed = this.runningSpeed;
      } else {
        this.speed = this.walkingSpeed;
      }
    };
    var controlUpdate = function () {
      sprintUpdate.call(this);
      directionUpdate.call(this);
    };
    var graphicUpdate = function () {
      if (Math.round(this.body.velocity.x) !== 0 ||
          Math.round(this.body.velocity.y) !== 0) {
        if (this.keys.sprint.isDown) {
          this.animations.play('sprint');
        } else {
          this.animations.play('walk');
        }
      } else {
        this.animations.play('stand');
      }
    };
    var update = function () {
      graphicUpdate.call(this);
      controlUpdate.call(this);
    };
    var useSelected = function () {
      var selected = this.inventory.getSelectedItem();
      if (selected.canBeUsed) {
        selected.use();
      }
    };

    return {
      update : update,
      useSelected : useSelected
    };
  })();

  var defineKeys = function () {
    this.keys = game.input.keyboard.createCursorKeys();
    this.keys.use = game.input.keyboard.addKey(Phaser.Keyboard.X);
    this.keys.sprint = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.keys.loot = game.input.keyboard.addKey(Phaser.Keyboard.C);
  };

  var initialize = function (character) {
    defineKeys.call(character);
    character.updates = character.updates || [];
    character.updates.push(Instance.update);

    character.use = Instance.use;
    character.keys.use.onDown.add(Instance.useSelected, character);
  };

  return {
    initialize : initialize
  };
})();
