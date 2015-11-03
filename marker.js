var Marker = (function () {

  var Instance = (function () {
    return {
      spawn : function (level) {
        this.level = level;
        if (this.place.levelName === level.key) {
          this.marker = game.add.sprite(this.place.x, this.place.y, this.key);
          this.marker.smoothed = false;
          this.marker.anchor.set(0.5, 1);
          game.add.tween(this.marker.scale)
            .to({y : .8}, 3000,
                Phaser.Easing.Exponential.Out, true, 0, -1, true);

          zOrder.putInLayer(this.marker, 'MENU');
        }
      },
      canBeLooted : function () {
        return this.level && !this.isCollected &&
          this.place.levelName == this.level.key &&
          Phaser.Math.distance(this.level.pc.x, this.level.pc.y,
                               this.marker.x, this.marker.y) < 50;
        // Phaser.Rectangle.intersects(this.level.pc, this.marker);
      },
      getLooted : function () {
        var t;
        this.isCollected = true;
        var style = { font: '15px Sans', fill: '#000', align: 'center',
                      wordWrap: true, wordWrapWidth: game.width/2};
        t = game.add.text(game.width/2,
                          50, this.text, style);
        t.fixedToCamera = true;
        t.anchor.set(0.5,0.5)
        zOrder.putInLayer(t, 'MENU');
        this.marker.kill();
        game.add.tween(t.scale)
          .to({y: 0}, 500, Phaser.Easing.Exponential.In, true, 1000);
        game.add.tween(t.cameraOffset)
          .to({x: game.camera.x}, 500, Phaser.Easing.Linear.In, true, 1000);
      }
    };
  })();

  return {
    /**
     * Creates a question.
     * @param{string} text - the question asked in text.
     * @param{Answer.create()} answer - the answer that answers this question.
     * @param{{x: int, y: int, levelName: string}} place -
     * a rectangle delimiting the place and the level where this question can
     * be looted.
     */
    create : function (text, place, key) {
      var marker = {
        isCollected : false,
        place : place,
        text : text,
        key : key
      };
      util.inheritFunctions(marker, Instance);

      return marker;
    },
    spawn : function (level) {
      for (i=0; i<this.collection.length; i++) {
        this.collection[i].spawn(level);
      }
    },
    Instance : Instance
  };
})();
