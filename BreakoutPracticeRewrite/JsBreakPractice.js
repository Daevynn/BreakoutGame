// Canvas Variables

var canvas =  document.getElementById("myCanvas"); // Searches document for an element with matching Id
var ctx = canvas.getContext("2d"); // Sets the context of the canvas to reference

// Ball Variables

var ballX = canvas.width/2;
var ballY = canvas.height-70;
var ballDx = 2; // Ball x Speed
var ballDy = 2; // Ball y speed
var ballRadius = 5;

// Paddle Variables

var paddleX = canvas.width/2;
var paddleY = canvas.height-50;
var paddleWidth = 50;
var paddleHeight = 7;
var paddleDx = 2; // Paddle Speed
var leftPress = false; // Left keypress
var rightPress = false; // Right keypress

// Brick Variables
var brickHeight = 5;
var brickWidth = 30;
var brickPadding = 5; // Makes space between each brick
var brickOffsetLeft = 10; // Keeps bricks from left edge
var brickOffsetTop = 10; // Keeps bricks from top edge
var brickColumnCount = 0;
var brickRowCount = 0;

// Brick Array

var bricks = [] // Creates array for bricks

// c is the column. If column is less than the count, add 1 to column.

for(var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, strength: 1 };
    }
}