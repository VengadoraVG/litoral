var Loot = (function () {
  return {
    water : {
      key: 'water',
      status : ['full', 'half', 'empty'],
      create : function () {
        this.animations.add('full', [2]);
        this.animations.add('half', [1]);
        this.animations.add('empty', [0]);
        this.animations.play('full');
      },
      use : function () {
        var next = status.indexOf(this.animations.currentAnim.name);
        next = Math.max(0, next-1);
        this.animations.play(next);
      },
      reload : function (quantity) {
        this.animations.play(
          Math.min(2, status.indexOf(
            this.animations.currentAnim.name) + quantity));
      }
    },
    food : {}
  };
})();
