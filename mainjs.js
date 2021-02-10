// Canvas Variables

const canvas =  document.getElementById("breakOut"); // Searches document for an element with matching Id
const ctx = canvas.getContext("2d"); // Sets the context of the canvas to reference

// Ball Variables

const ballColor = "red";

let ballX = canvas.width / 2;
let ballY = canvas.height - 70;
let ballDx = 2; // Ball x Speed
let ballDy = -5; // Ball y speed
let ballRadius = 5;

// Paddle Variables

const paddleHeight = 10;
const paddleDx = 7; // Paddle Speed
const paddleColor = "blue"

let paddleX = canvas.width / 2;
let paddleY = canvas.height - 50;
let paddleWidth = 65;
let leftPress = false; // Left keypress
let rightPress = false; // Right keypress

// Text Variables

const textFill = "#171717";

// Brick Variables
const brickHeight = 10;
const brickPadding = 10; // Makes space between each brick
const brickOffsetLeft = 15; // Keeps bricks from left edge
const brickOffsetTop = 20; // Keeps bricks from top edge

let brickWidth = 60;
let brickColumnCount = 10;
let brickRowCount = 5;
let brickColor = "green";

//              --------     Brick Array    --------

let bricks = [] // Creates array for bricks

// c is the column. If column is less than the count, add 1 to column. Bricks array is now 1D, and c populates the first dimension.
// Take bricks array populated with c, to be bricks[c], append new array. r is the row, if r is less than count, add 1 to r. Bricks is now 2D array, bricks[c][r].
// Finally, add properties to bricks[c][r] array: x, y, and strength.

for(let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, strength: 1 };
    }
}

// Information variables

let score = 0;
let lives = 3;

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
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
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
                        draw();
                    }
                }
            }
        }
    }
}

function ballCollision () {
    if(ballX + ballDx > canvas.width - ballRadius || ballX + ballDx < ballRadius) {
        ballDx = -ballDx;
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
        draw();
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
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].strength >= 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
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
    requestAnimationFrame(draw)
}

draw();