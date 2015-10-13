var Corpose = (function () {
  return {
    create : function (corposeConfig) {
      var corpose = game.add.sprite(corposeConfig.x,corposeConfig.y,
                                    corposeConfig.nacionality + '-corpose');
      corpose.anchor.set(.5, .7);
      corpose.loot = corposeConfig.loot;
      zOrder.putInLayer(corpose, 'ACTION');

      return corpose;
    },

    createAll : function (arrayOfConfiguration, lvl) {
      var i;

      for (i=0; i<arrayOfConfiguration.length; i++) {
        this.create(arrayOfConfiguration[i]);
      }
    },

    enableLvlEditor : function (lvl) {
      this.lvl = lvl;
      var cursor = game.input.keyboard.createCursorKeys();
      cursor.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
      cursor.d = game.input.keyboard.addKey(Phaser.Keyboard.D);
      cursor.ctrl = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
      cursor.shift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
      game.camera.unfollow();
      game.camera.focusOn(lvl.pc);

      lvl.updates.push(function () {
        var sprite;
        if (cursor.a.isDown)
          game.camera.x -= game.cameraSpeed;
        if (cursor.d.isDown) {
          game.camera.x += game.cameraSpeed;
        }

        game.cameraSpeed = 3
        if (cursor.ctrl.isDown) {
          game.cameraSpeed += 5;
        }
        if (cursor.shift.isDown) {
          game.cameraSpeed += 10;
        }
      });

      game.input.onDown.add(function () {
        var x = Math.round((game.input.mousePointer.x + game.camera.x)/20)*20,
            y = Math.round((game.input.mousePointer.y + game.camera.y)/20)*20,
            floor = this.lvl.tilemap.findFloor(x),
            config;

        if (y > floor.superior || y < floor.inferior) {
          console.log('corpose is not on the floor', x, y);
          config = null;
        } else {
          config = {
            x : x,
            y : y,
            loot : [],
            nacionality : 'Bolivia'
          };
          sprite = game.add.sprite(x,y, 'corpose');
          sprite.anchor.set(0.5, 0.5);
          zOrder.putInLayer(sprite, 'ACTION');
        }

        this.tmp.push(config);

        return config
      }, this);
    },
    tmp : []
  };
})();
