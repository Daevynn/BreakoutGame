// Canvas Variables

var canvas =  document.getElementById("breakOut"); // Searches document for an element with matching Id
var ctx = canvas.getContext("2d"); // Sets the context of the canvas to reference

// Gamestart variable

var interval = setInterval(draw, 10);

// Ball Variables

var ballX = canvas.width / 2;
var ballY = canvas.height - 70;
var ballDx = 2; // Ball x Speed
var ballDy = -5; // Ball y speed
var ballRadius = 5;
var ballColor = "red";

// Paddle Variables

var paddleX = canvas.width / 2;
var paddleY = canvas.height - 50;
var paddleWidth = 65;
var paddleHeight = 10;
var paddleDx = 7; // Paddle Speed
var leftPress = false; // Left keypress
var rightPress = false; // Right keypress
var paddleColor = "blue"

// Text Variables

var textFill = "#171717";

// Brick Variables
var brickHeight = 10;
var brickWidth = 60;
var brickPadding = 10; // Makes space between each brick
var brickOffsetLeft = 15; // Keeps bricks from left edge
var brickOffsetTop = 20; // Keeps bricks from top edge
var brickColumnCount = 10;
var brickRowCount = 5;
var brickColor = "green"

//              --------     Brick Array    --------

var bricks = [] // Creates array for bricks

// c is the column. If column is less than the count, add 1 to column. Bricks array is now 1D, and c populates the first dimension.
// Take bricks array populated with c, to be bricks[c], append new array. r is the row, if r is less than count, add 1 to r. Bricks is now 2D array, bricks[c][r].
// Finally, add properties to bricks[c][r] array: x, y, and strength.

for(var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, strength: 1 };
    }
}

// Information variables

var score = 0;
var lives = 3;

//              --------     Event listeners    --------

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//              --------     Functions Start     --------

// Keypress functions

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPress = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPress = false;
    }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPress = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPress = true;
    }
}

function paddleMovement() {
    if(rightPress && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleDx;
    }
    if(leftPress && paddleX > 0) {
        paddleX -= paddleDx;
    }
}

// Reset Function

function resetPos() {
    ballX = canvas.width / 2;
    ballY = canvas.height - 70;
    ballDx = 2;
    ballDy = -5;
    paddleX = canvas.width / 2;
    paddleY = canvas.height - 50;
}

// Collision Detection Function

function brickCollision() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.strength >= 1) {
                if(ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
                    ballDy = -ballDy;
                    b.strength -= 1;
                    if(b.strength == 0) {
                        score++;
                    }
                    if(score == brickColumnCount * brickRowCount) {
                        alert("Congratulations! You've done it you son of a gun!");
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

function ballCollision () {
    if(ballX + ballDx > canvas.width - ballRadius || ballX + ballDx < ballRadius) {
        ballDx = -ballDx
    }
    if(ballY + ballDy < ballRadius) {
        ballDy = -ballDy;
    }
    if(ballX + ballDx > paddleX && ballX + ballDx < paddleX + paddleWidth && ballY + ballDy < paddleY && ballY + ballDy > paddleY - paddleHeight){
        ballDy = -ballDy;
    }
    else if(ballY + ballDy > canvas.height - ballRadius) {
        ballDy = -ballDy;
        if (!lives) {
            alert("Game Over.");
        document.location.reload();
        clearInterval(interval);
        }
        else {
            lives--;
            resetPos();
        }
    }
}

// Drawing Functins

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = textFill;
    ctx.fillText("Score: " + score, 650, 590);
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleColor;
    ctx.fill();
    ctx.closePath;
}

function drawBricks() {
    for(var c = 0; c < brickColumnCount; c++) {
        for(var r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].strength >= 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = brickColor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = textFill;
    ctx.fillText("Lives: " + lives, 20, 590);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    paddleMovement();
    brickCollision();
    ballCollision();
    ballX += ballDx;
    ballY += ballDy;
}