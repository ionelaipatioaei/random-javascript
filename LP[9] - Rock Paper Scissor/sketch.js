var img = [];
var button = [];

var score = [0, 0];
var playerChar = 0;
var computerChar = 0;
var gameOver = false;
var delay = true;
var endText = "";
var winner;

function preload() {
    //Game graphics
    //Hands should be rotated in the right position based on player/computer turn!
    img[0] = loadImage("imgs/scissor.png");
    img[1] = loadImage("imgs/rock.png");
    img[2] = loadImage("imgs/paper.png");

    //Button graphics
    img[3] = loadImage("imgs/scissor_button.png");
    img[4] = loadImage("imgs/rock_button.png");
    img[5] = loadImage("imgs/paper_button.png");
    img[6] = loadImage("imgs/restart.png");
}

function setup() {
    //Effective space: 900 - 150 = 750;
    createCanvas(900, 500);
    imageMode(CENTER);
    textFont("Courier New");
    textStyle(BOLD);
}

function draw() {
    let col = color(255);
    let hoverCol = color(239, 202, 169);

    background(255);
    drawText();

    push();
    imageMode(CORNER);
    button[0] = new Button(25, 75, 100, 100, img[3], col, hoverCol, 1).show();
    button[1] = new Button(25, 200, 100, 100, img[4], col, hoverCol, 2).show();
    button[2] = new Button(25, 325, 100, 100, img[5], col, hoverCol, 3).show();

    button[3] = new Button(450, 425, 150, 50, img[6], col, hoverCol, 4).show();
    pop();

    drawChar();
    winnerTest();
}

function drawText() {
    push();
    textSize(30);
    fill(217, 133, 59);
    text("Player Score: " + score[0], 170, 50);
    text("Computer Score: " + score[1], 550, 50);
    pop();

    line(150, 25, 150, height - 25);
    if(!gameOver) {
        line(525, 25, 525, height - 25);
    } else {
        line(525, 200, 525, height - 25);
    }
}

function drawChar() {
    if(playerChar != 0) {
        gameOver = true;

        image(img[computerChar - 1], 713, 300);
        image(img[playerChar - 1], 337, 300);
    }
    if(!gameOver) {
        computerChar = generateChar();
    } else {
        push();
        textAlign(CENTER);
        textSize(85);
        fill(217, 133, 59);
        text(endText, (width + 150) / 2, 150);
        pop();
    }
}

function generateChar() {
    return Math.floor(random(1, 4));
}

function winnerTest() {
    let player = [1, 1, 2, 2, 3, 3];
    let computer = [2, 3, 1, 3, 1, 2];
    let result = [1, 0, 0, 1, 1, 0];

    if(gameOver) {
        if(playerChar == computerChar) {
            endText = "DRAW!";
        }
        for(let i = 0; i < 6; i++) {
            if(playerChar == player[i] && computerChar == computer[i]) {
                if(result[i] == 0) {
                    endText = "PLAYER WINS!";
                    winner = 0;
                } else if(result[i] == 1){
                    endText = "COMPUTER WINS!";
                    winner = 1;
                }
            }
        }
    }
}

function addScore() {
    if(winner == 0) {
        score[0]++;
    } else if(winner == 1) {
        score[1]++;
    }
}

function Button(x, y, sizeX, sizeY, img, col, hoverCol, action) {
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.img = img;
    this.col = col;
    this.hoverCol = hoverCol;
    this.action = action;

    this.show = function() {
        fill(this.col);
        if(this.hover()) {
            fill(this.hoverCol);
        }
        rect(this.x, this.y, this.sizeX, this.sizeY);
        image(this.img, this.x, this.y);
    }

    this.hover = function() {
        let sideL = this.x;
        let sideR = this.x + this.sizeX;
        let sideU = this.y;
        let sideD = this.y + this.sizeY;

        if(mouseX > sideL && mouseX < sideR && mouseY > sideU && mouseY < sideD) {
            if(mouseIsPressed && delay && playerChar == 0) {
                delay = false;
                switch(this.action) {
                    case 1:
                        playerChar = 1;
                        break;
                    case 2:
                        playerChar = 2;
                        break;
                    case 3:
                        playerChar = 3;
                        break;
                }
                resetDelay(250);
            } else if(mouseIsPressed && delay && this.action == 4) {
                delay = false;
                gameOver = false;
                playerChar = 0;
                addScore();
                winner = undefined;
                resetDelay(250);
            }
            return true;
        } else {
            return false;
        }
    }
}

function resetDelay(amount) {
    setTimeout(function() {
        delay = true;
    }, amount);
}
