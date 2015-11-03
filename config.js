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
      max : 2
    },
    food : {
      key : 'food',
      cooldown : 1000,
      max : 1
    }
  } // TODO: fix loot, return, water and food constants
  // meanwhile, items configuration is totally useless
};
