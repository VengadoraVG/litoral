var Item = (function () {
  var Instance = (function () {
    return {
      use : function () {
        this.chargesLeft = Math.max(0, this.chargesLeft-1);
        this.animations.play(this.chargesLeft);
      },

      canBeUsed : function () {
        return this.chargesLeft > 0;
      },

      isFull : function () {
        return this.chargesLeft === this.max;
      },

      fill : function () {
        this.chargesLeft = this.max;
        this.animations.play(this.chargesLeft);
        console.log('ding', this.chargesLeft);
      }
    };
  })();

  var addAnimations = function () {
    var i = this.max+1;

    while (i--) {
      this.animations.add(i, [i]);
    }
  };

  return {
    create : function (key, inventory, max, cooldownTime, castTime) {
      var x = inventory.items.length * inventory.selectionFrame.width,
          y = 0,
          item = inventory.addSprite(x,y, key);

      util.inheritFunctions(item, Instance);

      item.inventory = inventory;
      item.index = inventory.items.length;
      inventory.items.push(item);
      inventory.hash[key] = item.index;

      item.max = max;
      item.cooldownTime = cooldownTime;
      item.castTime = castTime;

      addAnimations.call(item);
      item.fill();

      return item;
    }
  };
})();
