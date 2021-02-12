// Canvas Variables

const canvas =  document.getElementById("breakOut"); // Searches document for an element with matching Id
const ctx = canvas.getContext("2d"); // Sets the context of the canvas to reference

// Classes

class Ball {
    constructor(x = canvas.width / 2, y = canvas.height - 70, dx = 2, dy = -5, radius = 5, color = "red") {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }
}

class Paddle {
    constructor(x = canvas.width / 2, y = canvas.height - 50, dx = 7, width = 65, height = 10, color = "blue") {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

class Brick {
    constructor(height = 10, width = 60, padding = 10, offsetLeft = 15, offsetTop = 15, strength = 1, color = "green", left = false, right = false) {
        this.height = height;
        this.width = width;
        this.padding = padding;
        this.offsetLeft = offsetLeft;
        this.offsetTop = offsetTop;
        this.strength = strength;
        this.color = color;
        this.left = left;
        this.right = right;
    }
}

// Objects

let ball = new Ball();

let paddle = new Paddle();

let brick = new Brick();

// Paddle Variables

// let leftPress = false; // Left keypress
// let rightPress = false; // Right keypress

// Text Variables

const textFill = "#171717";

// Brick Variables

let brickColumnCount = 10;
let brickRowCount = 5;

//              --------     Brick Array    --------

let bricks = [] // Creates array for bricks

// c is the column. If column is less than the count, add 1 to column. Bricks array is now 1D, and c populates the first dimension.
// Take bricks array populated with c, to be bricks[c], append new array. r is the row, if r is less than count, add 1 to r. Bricks is now 2D array, bricks[c][r].
// Finally, add properties to bricks[c][r] array: x, y, and strength.

for(let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, strength: brick.strength, color: brick.color };
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
        paddle.right = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        paddle.left = false;
    }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        paddle.right = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        paddle.left = true;
    }
}

function paddleMovement() {
    if(paddle.right && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddle.dx;
    }
    if(paddle.left && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }
}

// Reset Function

function resetPos() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height - 70;
    ball.dx = 2;
    ball.dy = -5;
    paddle.x = canvas.width / 2;
    paddle.y = canvas.height - 50;
}

// Collision Detection Function

function brickCollision() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.strength >= 1) {
                if(ball.x > b.x && ball.x < b.x + brick.width && ball.y > b.y && ball.y < b.y + brick.height) {
                    ball.dy = -ball.dy;
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
    if(ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if(ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }
    if(ball.x + ball.dx > paddle.x && ball.x + ball.dx < paddle.x + paddle.width && ball.y + ball.dy < paddle.y && ball.y + ball.dy > paddle.y - paddle.height){
        ball.dy = -ball.dy;
    }
    else if(ball.y + ball.dy > canvas.height - ball.radius) {
        ball.dy = -ball.dy;
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
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath;
}

function drawBricks() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].strength >= 1) {
                let brickX = (c * (brick.width + brick.padding)) + brick.offsetLeft;
                let brickY = (r * (brick.height + brick.padding)) + brick.offsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brick.width, brick.height);
                ctx.fillStyle = brick.color;
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
    ball.x += ball.dx;
    ball.y += ball.dy;
    requestAnimationFrame(draw)
}

draw();