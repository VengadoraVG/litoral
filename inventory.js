var Inventory = (function () {
  var Instance = (function () {
    var selectMe = function () {
      this.inventory.select(this.index);
    }
    
    return {
      select : function (itemIndex) {
        this.selectedItem = Math.max(
          Math.min(this.items.length-1, itemIndex)
          ,0);
        this.selectionFrame.cameraOffset.x =
          this.selectionFrame.width * this.selectedItem;
        
        return this.selectedItem;
      },
      getSelectedItem : function () {
        return this.items[this.selectedItem];
      },
      addKeys : function () {
        var i=this.items.length,
            index,
            phaserKey,
            key;

        while (i--) {
          index = this.items[i].index;
          phaserKey = Phaser.Keyboard[Inventory.keys[index]];
          key = game.input.keyboard.addKey(phaserKey);
          this.keys.push(key);
          key.onDown.add(selectMe, this.items[i]);
        }
      },
      addSprite : function (x, y, key) {
        var thing = game.add.sprite(x, game.height-y, key);
        thing.anchor.set(0,1);
        thing.fixedToCamera = true;
        zOrder.putInLayer(thing, 'MENU');

        return thing;
      },
      addItem : function (key, max, cooldownTime, castTime) {
        var item = Item.create(key, this, max, cooldownTime, castTime);
        return item;
      },
      lootItems : function (loot) {
        var i = loot.length;
        while (i--) {
          if (loot[i] && !this.getItem(loot[i]).isFull()) {
            this.getItem(loot[i]).fill();
            loot[i] = null;
          }
        }
      },
      getItem : function (key) {
        return this.items[this.hash[key]];
      },
      startCastingSelected : function () {
        var selected = this.getSelectedItem();
        if (selected.canBeUsed()) {
          console.log(this.level.pc.key);
          this.level.pc.cast(selected);
          // selected.use();
        }
      },
      useSelected : function () {
        var selected = this.getSelectedItem();
        if (selected.canBeUsed()) {
          selected.use();
        }        
      }
    };
  })();

  return {
    keys : ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE',
            'SIX', 'SEVEN', 'EIGHT', 'NINE', 'ZERO'],
    create : function (level) {
      var inventory = {
        selectedItem : 0,
        items : [],
        keys : [],
        hash : {},
      },
          c;

      util.inheritFunctions(inventory, Instance);
      inventory.selectionFrame =
        inventory.addSprite(0,0, 'selection-frame');
      inventory.frame = inventory.addSprite(0,0, 'inventory-frame');
      inventory.level = level;

      c = config.items.water;
      inventory.addItem(c.key, c.max, c.cooldown, c.castTime);
      c = config.items.food;
      inventory.addItem(c.key, c.max, c.cooldown, c.castTime);

      inventory.addKeys();

      return inventory;
    }
  };
})();
