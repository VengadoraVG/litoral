var zOrder = (function () {
  var order = [],
      nLayers = 7,
      i;

  for (i=0; i<nLayers; i++) {
    order.push([]);
  }
  
  return {
    order : order,
    HIDDEN : 0,
    SKY : 1,
    MOUNTAINS : 2,
    FLOOR : 3,
    ACTION : 4,
    FRONT : 5,
    MENU : 6,

    sort : function () {
      var i, j;

      for (i=0; i<order.length; i++) {
        for (j=0; j<order[i].length; j++) {
          if (i === this.ACTION) {
            game.world.bringToTop(this.actionGroup);
          }
          order[i][j].bringToTop();
        }
      }

      this.actionGroup.sort('y', Phaser.Group.SORT_ASCENDING);
    },

    putInLayer : function (sprite, layerKey) {
      this.order[this[layerKey]].push(sprite);
      if (layerKey === 'ACTION') {
        if (!this.actionGroup) {
          this.actionGroup = game.add.group();
        }

        this.actionGroup.add(sprite);
      }
    }
  };
})();
