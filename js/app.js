'use strict';

// Generic base class for sprites to be extended
var Sprite = function (sprite, x, y) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
}

// Engine required function to render sprites
Sprite.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Constructor function for enemies
var Enemy = function (x, y, speed) {
  Sprite.call(this, 'images/enemy-bug.png', x, y);
  this.speed = speed;
}

// Defines inheritance from sprite
Enemy.prototype = Object.create(Sprite.prototype);

// Define function to use as constructor for enemy, initializes speed and position
Enemy.prototype.constructor = Enemy;

// Engine required function to update enemies in screen
Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;
  if (this.x > 500) {
    this.x = -100
  };
}

// Constructor function for player
var Player = function (x, y) {
  Sprite.call(this, 'images/char-boy.png', x, y);
}
// Defines inheritance from sprite
Player.prototype = Object.create(Sprite.prototype);

// Define function to use as constructor for player
Player.prototype.constructor = Player;

// Engine required function to update player in screen
// Checks the player is not off the screen and repositions if it is
Player.prototype.update = function (dt) {
  if (this.x < 0) {
    this.x = 0
  };
  if (this.x > 400) {
    this.x = 400
  };
  if (this.y > 375) {
    this.y = 375
  };
  if (this.y < 50) {
    alert("You won !!");
    this.restart();
  };
}

// Update player position based on last key event
Player.prototype.handleInput = function (key) {
  if (key == 'left') {
    this.x -= 100
  };
  if (key == 'right') {
    this.x += 100
  };
  if (key == 'up') {
    this.y -= 80
  };
  if (key == 'down') {
    this.y += 80
  };
}

// Initial position to restart when player is killed or finish the game
Player.prototype.restart = function() {
    this.x = 200;
    this.y = 375;
}

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(new Enemy(-200, 215, 75));
allEnemies.push(new Enemy(-100, 215, 75));
allEnemies.push(new Enemy(-200, 135, 150));
allEnemies.push(new Enemy(0, 55, 75));
allEnemies.push(new Enemy(-200, 55, 75));
allEnemies.push(new Enemy(200, 55, 75));

// Place the player object in a variable called player
var player = new Player(200, 375);


// Engine required function to manage collisions and restart player if required
var checkCollisions = function() {
    allEnemies.forEach(function(enemy) {
        if (enemy.y == player.y && (Math.abs(enemy.x - player.x) < 70)) {
            player.restart();
        };
    });
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
