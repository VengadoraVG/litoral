var Loot = (function () {
  var water;

  var Consumable = (function () {

    return {
      create : function (key, status, cooldown) {
        return {
          key: key,
          status: status,
          canBeUsed: true,
          cooldown : {
            isReady : true,
            time : cooldown
          },

          isFull : function () {
            return key === (status.length-1);
          },
          isEmpty : function () {
            return key === 0;
          },
          startCooldown : function () {
            this.cooldown.isReady = false;
            this.alpha = 0.5;
            game.time.events.add(this.cooldown.time,
                                 this.stopCooldown, this);
          },
          stopCooldown : function () {
            this.cooldown.isReady = true;
            this.alpha = 1;
          },
          create: function () {
            var i
            for (i=0; i<this.status.length; i++) {
              this.animations.add(this.status[i], [i]);
            }
            this.animations.play(this.status[this.status.length-1]);
          },
          use: function () {
            var next;

            if (this.cooldown.isReady) {
              this.startCooldown();
              next = this.status.indexOf(this.animations.currentAnim.name);
              next = Math.max(0, next-1);
              this.canBeUsed = next > 0;
              console.log(next);
              this.animations.play(this.status[next]);
            } else {
              this.canBeUsed = false;
            }
            return this.canBeUsed;
          },
          reload: function () {
            var quantity = 1;
            this.animations.play(this.status[
              Math.min(this.status.length-1, this.status.indexOf(
                this.animations.currentAnim.name) + quantity)]);
          }
        };
      }
    };
  })();

  return {
    water : Consumable.create('water', ['empty', 'half', 'full'],
                             500),
    food : Consumable.create('food', ['eaten', 'full'],
                             1000)
  };
})();


