var Corpose = (function () {
  var Instance = (function () {
    return {
      getLooted : function () {
        if (game.physics.arcade.overlap(this.lvl.pc, this)) {
          this.lvl.pc.inventory.lootItems(this.loot);
        }
      }
    };
  })();
  
  return {
    create : function (corposeConfig, lvl) {
      var corpose = game.add.sprite(corposeConfig.x,corposeConfig.y,
                                    corposeConfig.nacionality + '-corpose');
      game.physics.arcade.enable(corpose);
      corpose.anchor.set(.5, .7);
      corpose.loot = corposeConfig.loot;
      corpose.lvl = lvl;
      zOrder.putInLayer(corpose, 'ACTION');
      this.collection.push(corpose);
      util.inheritFunctions(corpose, Instance);

      // TODO: add an event for looting each corpose
      lvl.pc.keys.loot.onDown.add(corpose.getLooted, corpose);

      return corpose;
    },

    createAll : function (arrayOfConfiguration, lvl) {
      var i;

      for (i=0; i<arrayOfConfiguration.length; i++) {
        this.create(arrayOfConfiguration[i], lvl);
      }
    },
    collection: []
  };
})();
