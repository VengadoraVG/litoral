var config = {
  world: {
    gravity: 0
  },

  batallaDeCalama: {
    corposes : [{
      x: 480, y: 800,
      loot:[Loot.food],
      nacionality:"bolivia"
    }, {
      x: 580,
      y: 780,
      loot:[Loot.water],
      nacionality: "bolivia"
    }, {
      x: 520,
      y: 840,
      loot: [Loot.water, Loot.food],
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
  }
};
