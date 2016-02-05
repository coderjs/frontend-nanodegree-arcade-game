// Returns a random number between min (inclusive) and max (exclusive)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomArbitrary(min, max) {
  "use strict";
  return Math.floor(Math.random() * (max - min)) + min;
}

// Set tile width and height for player movement and collision boundaries
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;

// Enemies our player must avoid
var Enemy = function(startX,startY,speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  "use strict";
  this.x = startX;
  this.y = startY;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Returns a random number between 1 and 5 (speed), then multiples by 75
// http://www.w3schools.com/jsref/jsref_random.asp
Enemy.prototype.randomSpeed = function() {
  "use strict";
  var speedMultiply = Math.floor((Math.random() * 5) + 1);
  this.speed = 75 * speedMultiply;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  "use strict";
  this.x += this.speed * dt;
  this.reset();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  "use strict";
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
  "use strict";
  if (this.x > 505) {
    this.x = -60;
    // Create a new random speed for the enemy bug to use after it resets (min, max).
    // Without this, the speed of each enemy bug is the same for each "lap."
    // By adding this line of code, each bug begins a new lap at different speeds.
    this.speed = getRandomArbitrary(200, 700);
  }
};

Enemy.prototype.randomSpeed = function() {
  "use strict";
  var speedMultiply = Math.floor(Math.random() * 5 + 1);
  this.speed = 75 * speedMultiply;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Set Player starting position
var PLAYER_START_X = 200;
var PLAYER_START_Y = 400;

// Write the Player class
var Player = function(x,y) {
  "use strict";
  this.x = PLAYER_START_X;
  this.y = PLAYER_START_Y;
  this.sprite = 'images/char-boy.png';
};

// Update the Player's position
Player.prototype.update = function() {
  //collision detection
  "use strict";
  this.checkCollisions();
  if (this.y < 68 && this.y <= 400 && this.x >= -2 && this.x <= 505) {
    alert("You scored a point! Click 'OK' to continue.");
    this.reset();

  score += 1;
    gameLevel += 1;
    console.log('current score: ' + score + ', current level: ' + gameLevel + ', current lives: ' + lives);
    //increaseDifficulty(score);
  }
};

// Draw the player on the screen, required method for game
// Display score, game level, and lives
Player.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score, gameLevel, lives);
};

Player.prototype.handleInput = function(keyPress) {
  "use strict";
  if (keyPress === 'left') {
    this.x -= TILE_WIDTH;
  }
  if (keyPress === 'up') {
    this.y -= TILE_HEIGHT;
  }
  if (keyPress === 'right') {
    this.x += TILE_WIDTH;
  }
  if (keyPress === 'down') {
    this.y += TILE_HEIGHT;
  }
  console.log(this.x, this.y);
};

// Function to display player's score
// The 3 properties of 'function()' are instances of score, gameLevel, lives
var displayScoreLevel = function(aScore, aLevel, aLife) {
  "use strict";
  ctx.fillStyle = "white";
  ctx.font = "20px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Score: " + aScore, 10, 64);
  ctx.fillText("Level: " + aLevel, 212, 64);
  ctx.fillText("Lives: " + aLife, 414, 64);
};

Player.prototype.checkCollisions = function() {
  "use strict";
  for (var i = 0; i < allEnemies.length; i++) {
    var enemy = allEnemies[i];
    // Reset the player back to start if it collides with enemy bug
    // && is the boolean operator ("and"). If both true, then true. If one is false, then false.
    // Bound Box Collision Detection: http://gamedev.stackexchange.com/questions/586/what-is-the-fastest-way-to-work-out-2d-bounding-box-intersection
    // No collission if ((this.x >= enemy.x + TILE_WIDTH) && (this.x + TILE_WIDTH) <= enemy.x && this.y >= (enemy.y + TILE_HEIGHT) && (this.y + TILE_HEIGHT) <= enemy.y)

    if (this.x >= enemy.x && this.x < (enemy.x + TILE_WIDTH) && this.y >= enemy.y && this.y < (enemy.y + TILE_HEIGHT)) {
      lives = lives - 1;
      console.log('Splat!');
      if (lives > -1) {
        alert("COLLISION!\nYou lose a life.\nClick 'OK' to continue the game.");
      } else {
        alert("GAME OVER!\nBetter luck next time.\nClick 'OK' to play again.");
        lives = 3;
        score = 0;
        gameLevel = 1;
      }
      this.reset();

    }
    // check if player runs into left, bottom, top, or right canvas walls
    // prevent player from moving beyond canvas wall boundaries
    if (this.y > 400 ) {
        this.y = 400;
    }
     if (this.y < 0 ) {
        this.y = 0;
    }
  if (this.x > 402.5) {
        this.x = 402.5;
    }
    if (this.x < 2.5) {
        this.x = 2.5;
    }

    }
};

Player.prototype.reset = function() {
  "use strict";
  this.x = PLAYER_START_X;
  this.y = PLAYER_START_Y;
  this.sprite = 'images/char-boy.png';
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Enemy randomly placed vertically within section of canvas

var allEnemies = [];
for (var i = 0; i < 3; i++) {
  "use strict";
  var tempSpeed = Math.floor(Math.random() * 5 + 1) * 99;
  allEnemies.push(new Enemy(-TILE_WIDTH, (50 + (90 * i)), tempSpeed));
}

// Instantiate score and game level
// Declare new score, gameLevel, and lives variables
var score = 0;
var lives = 3;
var gameLevel = 1;

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  "use strict";
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});