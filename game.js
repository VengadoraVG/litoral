var game = new Phaser.Game(600, 400, Phaser.AUTO, 'game');
game.state.add('batalla-de-calama', batallaDeCalama);
game.state.start('batalla-de-calama'); 
