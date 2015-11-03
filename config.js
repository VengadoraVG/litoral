var config = {
  world: {
    gravity: 0
  },

  batallaDeCalama: {
    corposes : [{
      x: 480, y: 800,
      loot:['food'],
      nacionality:"bolivia"
    }, {
      x: 580,
      y: 780,
      loot:['water'],
      nacionality: "bolivia"
    }, {
      x: 520,
      y: 840,
      loot: ['water', 'food'],
      nacionality: "bolivia"
    }]
  },

  parallax: {
    skyWidth : 2000,
    floorHeight : 100
  },

  character: {
    speed: {
      walk: 80,
      run: 150
    }
  },

  items : {
    water : {
      key : 'water',
      cooldown : 500,
      max : 2,
      castTime : 2000,
      castAnimations : {
        frames : [11, 12,
                  13, 13, 13, 13, 14, 14, 14, 14, 14,
                  13, 13, 13, 13, 14, 14, 14, 14, 14,
                  13, 13, 13, 13, 14, 14, 14, 14, 14,
                  13, 13, 13, 13,
                  12, 11, 11, 11, 11, 11, 11],
        fps : 10
      }
    },
    food : {
      key : 'food',
      cooldown : 1000,
      max : 1,
      castTime : 3000
    }
  } // TODO: fix loot, return, water and food constants
  // meanwhile, items configuration is totally useless
};
