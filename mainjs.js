// Canvas Variables

const canvas =  document.getElementById("breakOut"); // Searches document for an element with matching Id
const ctx = canvas.getContext("2d"); // Sets the context of the canvas to reference

// Classes

class Ball {
    constructor(x, y, dx, dy,radius, color = "red") {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Paddle {
    constructor(x, y, dx, width, height, color, left, right, ang) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.width = width;
        this.height = height;
        this.color = color;
        this.left = left;
        this.right = right;
        this.ang = ang;
    }
    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath;

        ctx.beginPath();
        ctx.moveTo((this.x + this.width / 2), (this.y - this.width / 2));
        ctx.lineTo((this.x + this.width / 2), this.y);
        ctx.stroke();
    }
}

class Brick {
    constructor(x, y, strength, color, width, height) {
        this.x = x;
        this.y = y;
        this.strength = strength;
        this.color = color;
        this.width = width;
        this.height = height;
    }
    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Field {
    constructor(columns, rows) {
        this.columns = columns;
        this.rows = rows;
    }
    render() {

    }
}


// Objects

let ballRadius = 5;
let ballX = canvas.width / 2;
let ballY = canvas.height - 90;
let ballColor = "red";
let ballDx = 2;
let ballDy = -5;

let ball = new Ball(ballX, ballY, ballDx, ballDy, ballRadius, ballColor);

let paddleWidth = 85;
let paddleHeight = 10;
let paddleX = canvas.width / 2 - paddleWidth / 2;
let paddleY = canvas.height - 50;
let paddleColor = "blue";
let paddleDx = 10;
let paddleAng = paddleY + paddleWidth / 2;

let paddle = new Paddle(paddleX, paddleY, paddleDx, paddleWidth, paddleHeight, paddleColor, false, false, paddleAng);

// Variables

let brickHeight = 10;
let brickWidth = 60;
let brickStrength = 1;
let brickOffsetTop = 15;
let brickOffsetLeft = 15;
let brickColor = "green";
let brickPadding = 10;

// Text Variables

const textFill = "#171717";

// Brick Variables

let brickColumnCount = 10;
let brickRowCount = 5;

//              --------     Brick Array    --------


// c is the column. If column is less than the count, add 1 to column. Bricks array is now 1D, and c populates the first dimension.
// Take bricks array populated with c, to be bricks[c], append new array. r is the row, if r is less than count, add 1 to r. Bricks is now 2D array, bricks[c][r].
// Finally, add properties to bricks[c][r] array: x, y, and strength.

let bricks = [];

function initializeBricks () {
        for(let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for(let r = 0; r < brickRowCount; r++) {
            const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
            const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r] = new Brick(brickX, brickY, brickStrength, brickColor, brickWidth, brickHeight);
        }
    }
}

initializeBricks();

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
    ball.y = canvas.height - 90;
    ball.dx = 2;
    ball.dy = -5;
    paddle.x = canvas.width / 2 - paddle.width / 2;
    paddle.y = canvas.height - 50;
}

// Collision Detection Function

function brickCollision() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.strength >= 1) {
                if(ball.x > b.x && ball.x < b.x + b.width && ball.y > b.y && ball.y < b.y + b.height) {
                    ball.dy = -ball.dy;
                    b.strength -= 1;
                    if(b.strength == 0) {
                        score += 1;
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

// Angle Function

function getAngle() { // calcuates that angle of ball compared to paddle
    const xCalc = (paddle.x + (paddle.width / 2) - (ball.x + ball.dx));
    const yCalc = (paddle.y - ball.y);
    let angle = Math.atan2(yCalc, xCalc) * 180 / Math.PI;
    return angle;
}

let colAngle = getAngle(); // Sets the colAngle variable to result from getAngle function

function angleCollision (colAngle) { // changes ball's velocity based on angle it hits, better to change to switch statement
    if (colAngle >= 0 && colAngle <= 29) {
        ball.dx = -(Math.abs(ballDx * 1.5))
        ball.dy = ballDy;
    }
    else if (colAngle >= 30 && colAngle <= 59) {
        ball.dx = -(Math.abs(ballDx));
        ball.dy = ballDy;
    }
    else if (colAngle >= 60 && colAngle <= 89 ) {
        ball.dx =- -(Math.abs(ballDx / 2));
        ball.dy = ballDy
    }
    else if (colAngle == 90) {
        ball.dx = 0;
        ball.dy = ballDy;
    }
    else if (colAngle >= 91 && colAngle <= 119) {
        ball.dx = (Math.abs(ballDx / 2));
        ball.dy = ballDy;
    }
    else if (colAngle >= 120 && colAngle <= 149) {
        ball.dx = (Math.abs(ballDx));
        ball.dy = ballDy;
    }
    else if (colAngle >= 150 && colAngle <= 180) {
        ball.dx = (Math.abs(ballDx * 1.5));
        ball.dy = ballDy;
    }
    else {
        ball.dx = ballDx;
        ball.dy = ballDy;
    }
}

// angleCollision(colAngle);

// Ball Collision

function ballCollision () {
    if(ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if(ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }
    if(ball.x + ball.dx > paddle.x && ball.x + ball.dx < paddle.x + paddle.width && ball.y + ball.dy < paddle.y && ball.y + ball.dy > paddle.y - paddle.height){
        // ball.dy = -ball.dy;
        // getAngle();
        angleCollision(colAngle);
        console.log(colAngle);
        console.log(ball.dx);
        console.log(ball.dy);
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

function drawBricks() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            let brick = bricks[c][r];
            if(brick.strength >= 1) {
                brick.render(ctx);
            }
        }
    }
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = textFill;
    ctx.fillText("Lives: " + lives, 20, 590);
}

function testPos() {
    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y);
    ctx.lineTo((paddle.x + (paddle.width / 2)), paddle.y);
    ctx.stroke();
}

function drawAngle(colAngle) {
    ctx.font = "16px Arial";
    ctx.fillStyle = textFill;
    ctx.fillText("Angle: " + colAngle, canvas.width / 2, canvas.height - 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    paddle.render(ctx);
    ball.render(ctx);
    testPos(); // testing positions
    colAngle = getAngle();
    drawAngle(colAngle); // testing angle
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