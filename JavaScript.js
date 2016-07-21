var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 4
var dy = -4
var colour = "purple";
var paddleH = 10;
var paddleW = 75;
var paddleX = (canvas.width - paddleW)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 7;
var brickW = 75;
var brickH = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

var bricks = []
for (c = 0; c < brickColumnCount; c++) {
    // creates an empty array in bricks at position 'c' 
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        //  creates a new bricks, {x:0,y:0, mode:1} object, in `bricks[c]` at position `r` 
        bricks[c][r] = { x: 0, y: 0, mode: 1 };
    }
}
//adds a keydown and up event, with the function and sets it to default to false
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//when key is pressed the function will fire
function keyDownHandler(e) {
    if (e.keyCode === 37 || e.keyCode === 65) {
        leftPressed = true;
    }
    else if (e.keyCode === 39 || e.keyCode === 68) {
        rightPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode === 37 || e.keyCode === 65) {
        leftPressed = false;
    }
    else if (e.keyCode === 39 || e.keyCode === 68) {
        rightPressed = false;
    }
}

//function drawing a ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.closePath();
}
//draws the paddle (user controlled)
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleH, paddleW, paddleH);
    ctx.fillStyle = "purple";
    ctx.fill();
    ctx.closePath()
}
function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            //if the mode object property equals one, draw the bricks
            if (bricks[c][r].mode === 1) {
                var brickX = (c * (brickW + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickH + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath;
                ctx.rect(brickX, brickY, brickW, brickH);
                ctx.fillStyle = "purple";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.mode == 1) {
                // if x(ball pos) is greater than brick x position plus the brick width 
                // if y(ball pos) is greater than brick y position plus the brick height 
                // set mode to 0 (disappear)
                if (x > b.x && x < b.x + brickW && y > b.y && y < b.y + brickH) {
                    dy = -dy;
                    b.mode = 0;
                    score++;
                    if (score === brickColumnCount * brickRowCount) {
                        alert("Well done! " + "You scored: " + score);
                        document.location.reload();

                    }
                }
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "purple";
    ctx.fillText("Score: " + score, 8, 20);

}

function drawLives() {
    ctx.font = "16 px Arial";
    ctx.fillStyle = "purple";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}


//clears the canvas and calls the drawBall, drawPaddle, drawBricks, collisionDetection functions
//updates the balls coordinates x and y
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    
    x += dx;
    y += dy;
//bounce off of the top 
    if (y + dy < ballRadius) {
        dy = -dy;      
    }
    //bounce off of the sides
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
        //if x(the ball) hits the paddle 
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleW) {
            dy = -dy * 1.1;
        }
            //
        else {
            lives--;
                // if ran out of lives (lives equals 0), gameover and will reload    
                if (lives ===0) {
                    //alert("Game Over" + "\nYou scored: " + score);
                    document.location.reload();
                }
                    //reset the game 
                else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 4;
                    dy = -4;
                    paddleX = (canvas.width - paddleW)/2;
                }
            

            
        }
    }
    


//moves the paddle right but stops it from leaving screen
    if (rightPressed && paddleX < canvas.width - paddleW) {
        paddleX += 6;
    }
//moves the paddle left but stops it from leaving the screen
    else if (leftPressed && paddleX > 0) {
        paddleX -= 6;
    }
    requestAnimationFrame(draw);
}



//drawing the circle every 10 miliseconds
draw();
