/**
 * must be created only once per level.
 */
var Inventory = (function () {
  var Instance = (function () {
    return {
      addItem : function (itemConfig) {
        var item = Inventory.addSprite(
          this.items.length*this.selectionFrame.width, 0, itemConfig.key);
        util.inheritFunctions(item, itemConfig);
        item.create();        
      }
    };
  })();

  return {
    create : function (lvl) {
      // var frame = game.add.sprite(game.height, game.width, 'inventory-frame');
      var inventory = {
        frame : Inventory.addSprite(0,0, 'inventory-frame'),
        selectionFrame : Inventory.addSprite(0,0, 'selection-frame'),
        items : []
      };

      util.inheritFunctions(inventory, Instance);
      inventory.addItem(Loot.water);

      return inventory;
    },

    addSprite : function (x,y, key) {
      var thing = game.add.sprite(x,game.height-y, key);
      thing.anchor.set(0,1);
      thing.fixedToCamera = true;
      zOrder.putInLayer(thing, 'MENU');

      return thing;
    }
  };
})();
