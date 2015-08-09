// Initialize phaser, and create a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

var startState = {
  preload: function() {
    // This function will be executed at the beginning
    // That's where we load the game's assets
    game.stage.backgroundColor = '#71c5cf';
  },

  create: function() {
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.play, this);
  },

  play: function() {
    game.state.start('main');
  },
};

// create our main state that will contain the game
var mainState = {
  preload: function() {
    // This function will be executed at the beginning
    // That's where we load the game's assets
    game.stage.backgroundColor = '#71c5cf';
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
    game.load.audio('jump', 'assets/jump.wav');
  },

  create: function() {
    // This function is called after the preload function
    // Here we set up the game, display sprites, etc.
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the bird on the screen
    this.bird = this.game.add.sprite(100, 245, 'bird');

    // add gravity
    game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;

    // add pipes
    this.pipes = game.add.group();
    this.pipes.enableBody = true;
    this.pipes.createMultiple(20, 'pipe');
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

    // call the jump function when the spacekey is hit
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    //add scoring
    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });

    this.bird.anchor.setTo(-0.2, 0.5);
  },

  update: function() {
    // This function is called 60 times per second
    // It contains the game's logic
    if (this.bird.inWorld == false) this.restartGame();
    game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);

    // adjust bird angle
    if (this.bird.angle < 20)
      this.bird.angle += 1;
  },

  jump: function() {
    if (this.bird.alive == false) return;
    this.bird.body.velocity.y = -350;
    var animation = game.add.tween(this.bird);
    animation.to({angle: -20}, 100);
    animation.start();
  },

  addOnePipe: function(x, y) {
    var pipe = this.pipes.getFirstDead();
    pipe.reset(x, y);
    pipe.body.velocity.x = -200;
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },

  addRowOfPipes: function () {
    // randomly places gap between top and bottom pipes
    var hole = Math.floor(Math.random() * 5) +1;
    // add 6 pipes
    for (var i=0; i<8; i++)
      if (i != hole && i != hole+1)
        this.addOnePipe(400, i*60+10);
    this.score += 1;
    this.labelScore.text = this.score;
  },

  hitPipe: function() {
    if (this.bird.alive == false)
      return;
    this.bird.alive = false;
    game.time.events.remove(this.timer);
    this.pipes.forEachAlive(function(p) {
      p.body.velocity.x = 0;
    }, this);
  },

  restartGame: function() {
    game.state.start('start');
  },
};

// add and start the main state to start the game
game.state.add('start', startState);
game.state.add('main', mainState);
game.state.start('start');
