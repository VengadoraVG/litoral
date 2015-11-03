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
      if (!this.casting) {
        sprintUpdate.call(this);
        directionUpdate.call(this);
      } else {
        this.body.velocity.x = 0;
      }
    };
    var graphicUpdate = function () {
      if (!this.casting) {
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
      }
    };
    var update = function () {
      graphicUpdate.call(this);
      controlUpdate.call(this);
    };
    var stopCasting = function () {
      if (this.casting) {
        useSelected.call(this);
        this.casting = null;
      }
    };
    var useSelected = function () {
      this.inventory.useSelected();
    };
    var interruptCasting = function () {
      if (this.casting) {
        game.time.events.remove(this.casting);
        this.casting = null;
      }
    };

    return {
      update : update,
      useSelected : useSelected,
      cast : function (item) {
        this.animations.play(item.key + '-casting');
        console.log(item.castTime);
        this.casting = game.time.events.add(item.castTime, stopCasting, this);
      },
      castSelected : function () {
        this.inventory.startCastingSelected();
      }
    };
  })();

  var defineKeys = function () {
    this.keys = game.input.keyboard.createCursorKeys();
    this.keys.use = game.input.keyboard.addKey(Phaser.Keyboard.X);
    this.keys.sprint = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.keys.loot = game.input.keyboard.addKey(Phaser.Keyboard.C);
  };

  var initialize = function (character) {
    var c;
    defineKeys.call(character);
    character.updates = character.updates || [];
    character.updates.push(Instance.update);

    util.inheritFunctions(character, Instance);

    character.isCasting = false;
    character.keys.use.onDown.add(Instance.castSelected, character);

    c = config.items.water;
    character.animations.add(c.key + '-casting', c.castAnimations.frames,
                             c.castAnimations.fps, true);
    character.smoothed = false;
  };

  return {
    initialize : initialize
  };
})();
