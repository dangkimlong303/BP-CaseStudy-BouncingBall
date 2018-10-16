var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var x = canvas.width/2;
var y = canvas.height - 30;
var speedX = 2;
var speedY = -2;
var ballRadius = 10;
var paddleWidth = 75;
var paddleHeight = 10;
var paddleX = (canvas.width - paddleWidth)/2;
var paddleY = canvas.height - paddleHeight;
var speedPaddle = 7;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 70;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 50;
var score = 0;
var lives = 3;

var brick = [];
for (var i = 0; i < brickColumnCount; i++){
    brick[i] = [];
    for (var j = 0; j < brickRowCount; j++){
        brick[i][j] = {x:0,y:0,status:1};
    }
}

document.addEventListener('keydown',keyDownHandler);
document.addEventListener('keyup',keyUpHandler);

function keyDownHandler(evt) {
    switch (evt.which) {
        case 39:
            rightPressed = true;
            break;
        case 37:
            leftPressed = true;
    }
}
function keyUpHandler(evt) {
    switch (evt.which) {
        case 39:
            rightPressed = false;
            break;
        case 37:
            leftPressed = false;
    }
}

function collisionDetection() {
    for (var i = 0; i < brickColumnCount; i++){
        for (var j = 0; j < brickRowCount; j++){
            var b = brick[i][j];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    speedY = -speedY;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount*brickColumnCount){
                        alert('You win !!');
                        clearInterval(run);
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    context.font = '16px Arial';
    context.fillStyle = 'red';
    context.fillText('Score: ' + score,8,20);
}

function drawBall() {
    context.beginPath();
    context.arc(x,y,ballRadius,0,2*Math.PI);
    context.fillStyle = 'green';
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX,paddleY,paddleWidth,paddleHeight);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();
}
function drawLives() {
    context.font = '16px Arial';
    context.fillStyle = 'red';
    context.fillText('Lives: ' + lives,canvas.width-65,20);
}

function drawBrick() {
    for (var i = 0; i < brickColumnCount; i++){
        for (var j = 0; j < brickRowCount; j++){
            if (brick[i][j].status == 1){
                var brickX = (j * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (i * (brickHeight + brickPadding)) + brickOffsetTop;
                brick[i][j].x = brickX;
                brick[i][j].y = brickY;
                context.beginPath();
                context.rect(brickX,brickY,brickWidth,brickHeight);
                context.fillStyle = 'pink';
                context.fill();
                context.closePath();
                console.log('bx ' + brickX);
                console.log('by ' + brickY);
            }
        }
    }
}

function draw() {
    context.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    drawBrick();
    drawScore();
    drawLives();
    collisionDetection();
    if (x + speedX > canvas.width - ballRadius || x + speedX < ballRadius){
        speedX = -speedX;
    }

    if ( y + speedY < ballRadius){
        speedY = -speedY;
    }else if (y + speedY > canvas.height - ballRadius ){
        if (x > paddleX && x < paddleX + paddleWidth){
            speedY = -speedY;
        }else {
            lives--;
            if (lives == 0){
                clearInterval(run);
                alert('Game over !!');
                document.location.reload();
            } else {
                x = canvas.width/2;
                y = canvas.height - 30;
                paddleX = (canvas.width - paddleWidth)/2;
            }
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth){
        paddleX += speedPaddle;
    } else if (leftPressed && paddleX > 0){
        paddleX -= speedPaddle;
    }
    x += speedX;
    y += speedY;
}

var run = setInterval(draw,10);

