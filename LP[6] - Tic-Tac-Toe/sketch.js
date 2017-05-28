var playPVPButton;
var playAIButton;
var restartButton;

var area = [];
var score = [0, 0];

var playPVP = false;
var playAI = false;
var gameOver = false;
var delayIsFinished = false;

var nextMove;

var currentTurn = 0;
var movesLeft = 9;
var winner = "-";
var moved = false;
var totalMoves = 0;

function setup() {
    createCanvas(600, 700);
    frameRate(30);
}

function draw() {
    background(253, 243, 231);
    if(!playPVP && !playAI) {
        startUI();
    }
    
    if(playPVP || playAI) {
        playingUI();
    }
}

function startUI() {
    textAlign(CENTER);
    fill(198, 61, 15);
    textSize(80);
    textFont("Courier New");
    textStyle(BOLD);
    
    text("TIC-TAC-TOE", width / 2, 60);
    textSize(25);
    
    startAnimation();
    
    playPVPButton = new Button(width / 2, height / 2 - 50, 300, 75, "PLAY", 60, 18, color(201, 208, 200), color(126, 143, 124), 1);
    playPVPButton.show();
    playAIButton = new Button(width / 2, height / 2 + 50, 300, 75, "PLAY VS AI", 45, 14, color(201, 208, 200), color(126, 143, 124), 2);
    playAIButton.show();
    
    push();
    fill(57);
    text("Created by xLionel775", 405, 90);
    text("Powered by P5JS", 450, height - 7);
    pop();
    
    //Here draw lines!
    push();
    strokeWeight(3);
    stroke(126, 143, 124);
    line(0, 100, width, 100);
    line(0, height - 30, width, height - 30);
    pop();
}

function startAnimation() {
    let alphaO = map(mouseX, 0, width, 255, 0);
    let alphaX = map(mouseY, 0, height, 0, 255);
    push();
    fill(198, 61, 15, alphaO);
    textSize(900);
    text("O", width / 2, height - 48);
    fill(126, 143, 124, alphaX);
    text("X", width / 2, height - 48);
    pop();
}

function startPlaying(type) {
    type ? playPVP = true : playAI = true;
}

function playingUI() {
    drawContent();
    
    drawGrid();
    if(!delayIsFinished) {
        setTimeout(function() {delayIsFinished = true;}, 500);
    }
    drawOX();
    movesLeft = 9 - totalMoves;
    win();
    drawWinner();
}

function drawContent() {
    push();
    textSize(35);
    text("O Score", 90, 30);
    text("X Score", 500, 30);
    textSize(90);
    text(score[0], 90, 95);
    text(score[1], 500, 95);
    pop();
    
    restartButton = new Button(width / 2, 47, 215, 65, "RESTART", 50, 15, color(201, 208, 200), color(126, 143, 124), 3);
    restartButton.show();
    
    //Lines
    push();
    strokeWeight(3);
    stroke(126, 143, 124);
    line(0, 100, width, 100);
    pop();
}

function drawGrid() {
    push();
    strokeWeight(3);
    stroke(126, 143, 124);
    //X-axis
    line(0, 300, width, 300);
    line(0, 500, width, 500);
    
    //Y-axis
    line(200, 100, 200, height);
    line(400, 100, 400, height);
    
    //Left margin
    line(1, 100, 1, height);
    
    //Bottom margin
    line(0, height - 2, width, height - 2);
    
    //Right margin
    line(width - 2, 100, width - 2, height);
    pop();
    
    if(delayIsFinished && !gameOver) {
        let par0 = [3, 202, 402, 3, 202, 402, 3, 202, 402];
        let par1 = [199, 399, 597, 199, 399, 597, 199, 399, 597];
        let par2 = [102, 102, 102, 302, 302, 302, 502, 502, 502];
        let par3 = [299, 299, 299, 499, 499, 499, 697, 697, 697];
        let par4 = [196, 197, 195, 196, 197, 195, 196, 197, 195];
        let par5 = [197, 197, 197, 197, 197, 197, 195, 195, 195];
        
        for(let j = 0; j <= 8; j++) {
            if(areaHover(par0[j], par1[j], par2[j], par3[j], par4[j], par5[j]) && mouseIsPressed && area[j] == undefined) {
                if(playPVP) {
                    currentTurn == 0 ? area[j] = 0 : area[j] = 1;
                    change();
                }
                if(playAI && currentTurn == 0) {
                    area[j] = 0;
                    change();
                }
            }
            if(playAI && currentTurn == 1) {
                if(movesLeft == 8) {
                    var r = Math.floor(random(0, 8));
                    if(area[r] == undefined) {
                        area[r] = 1;
                    } else {
                        area[findUndefinedArea()] = 1;
                    }
                    change();
                }
                if(movesLeft == 6 || movesLeft == 4 || movesLeft == 2) {
                    bestMove();
                    area[nextMove] = 1;
                    change();
                }
            }
        }
    }
}

function findUndefinedArea() {
    for(let i = 0; i <= 8; i++) {
        if(area[i] == undefined) {
            return i;
        }
    }
}

function areaHover(startX, endX, startY, endY, sizeX, sizeY) {
    if(mouseX > startX && mouseX < endX && mouseY > startY && mouseY < endY) {
        push();
        noStroke();
        fill(0, 40);
        rect(startX, startY, sizeX, sizeY);
        
        fill(198, 61, 15, 155);
        textSize(250);
        if(currentTurn == 0) {
            text("O", startX + 97, startY + 171);
        }
        fill(126, 143, 124, 155);
        if(currentTurn == 1) {
            text("X", startX + 97, startY + 171);
        }
        pop();
        
        return true;
    } else {
        return false;
    }
}

function drawOX() {
    let x = [100, 300, 500, 100, 300, 500, 100, 300, 500];
    let y = [273, 273, 273, 473, 473, 473, 673, 673, 673];
    for(let i = 0; i < area.length; i++) {
        drawLetter(x[i], y[i], area[i], 255);
    }
    
    function drawLetter(x, y, letter, opacity) {
        push();
        fill(198, 61, 15, opacity);
        textSize(250);
        if(letter == 0) {
            text("O", x, y);
        }
        fill(126, 143, 124, opacity);
        if(letter == 1) {
            text("X", x, y);
        }
        pop();
    }
}

function change() {
    if(!moved) {
        moved = true;
        currentTurn = 1;
    } else {
        moved = false;
        currentTurn = 0;
    }
    totalMoves += 1;
    if(win()) {
        addScore();
    }
}

function win() {
    let firstCell = [0, 2, 0, 3, 6, 0, 1, 2];
    let secondCell = [4, 4, 1, 4, 7, 3, 4, 5];
    let thirdCell = [8, 6, 2, 5, 8, 6, 7, 8];
    
    let areaX = [100, 300, 500, 100, 300, 500, 100, 300, 500];
    let areaY = [200, 200, 200, 400, 400, 400, 600, 600, 600];
    
    for(let i = 0; i <= 8; i++) {
        //Need a better way to do this!
        if(area[firstCell[i]] == 0 && area[secondCell[i]] == 0 && area[thirdCell[i]] == 0) {
            gameOver = true;
            winner = "O";
            drawLine(areaX[firstCell[i]], areaY[firstCell[i]], areaX[thirdCell[i]], areaY[thirdCell[i]]);
            return true;
        }
        if(area[firstCell[i]] == 1 && area[secondCell[i]] == 1 && area[thirdCell[i]] == 1) {
            gameOver = true;
            winner = "X";
            drawLine(areaX[firstCell[i]], areaY[firstCell[i]], areaX[thirdCell[i]], areaY[thirdCell[i]]);
            return true;
        }
    }
    
    function drawLine(startX, startY, endX, endY) {
        push();
        strokeWeight(25);
        stroke(72, 83, 70, 200);
        line(startX, startY, endX, endY);
        pop();
    }
    return false;
}

function addScore() {
    if(winner == "O") {
        score[0]++;
        winner = "-";
    }
    if(winner == "X") {
        score[1]++;
        winner = "-";
    }
}

function bestMove() {
    //Hard-coded combinations
    let startCell = [0, 1, 3, 4, 6, 7, 0, 3, 1, 4, 2, 5, 0, 4, 2, 4, 0, 1, 2, 3, 0, 6, 0, 2];
    let endCell = [1, 2, 4, 5, 7, 8, 3, 6, 4, 7, 5, 8, 4, 8, 4, 6, 8, 7, 6, 5, 2, 8, 6, 8];
    let optimalMove = [2, 0, 5, 3, 8, 6, 6, 0, 7, 1, 8, 2, 8, 0, 6, 2, 4, 4, 4, 4, 1, 7, 3, 5];
        
    for(let i = 0; i < 24; i++) {
        if(area[startCell[i]] != undefined && area[endCell[i]] != undefined && area[startCell[i]] == area[endCell[i]]) {
            if(area[optimalMove[i]] == undefined) {
                nextMove = optimalMove[i];
                break;
            } else {
                nextMove = findUndefinedArea();
            }
        }
    }
}

function drawWinner() {
    push();
    fill(57);
    textSize(140);
    if(gameOver && winner != "-") {
        text(winner + " WINS!", width / 2 + 10, height / 2 + 90);
    }
    if(movesLeft == 0 && winner == "-") {
        text("DRAW!", width / 2 + 10, height / 2 + 90);
        gameOver = true;
    }
    pop();
}

function restart() {
    for(let k = 0; k <= 8; k++) {
        area[k] = undefined;
    }
    currentTurn = 0;
    area.length = 0;
    movesLeft = 9;
    totalMoves = 0;
    moved = false;
    gameOver = false;
    winner = "-";
}

function Button(x, y, widthSize, heightSize, name, sizeText, textOffset, col, hoverCol, action) {
    this.x = x;
    this.y = y;
    this.w = widthSize;
    this.h = heightSize;
    this.name = name;
    this.color = col;
    this.hoverColor = hoverCol;
    this.click = action;
    this.tS = sizeText;
    this.toffset = textOffset
    
    this.show = function() {
        push();
        rectMode(CENTER);
        fill(col);
        if(this.hover()) {
            fill(this.hoverColor);
        }
        rect(this.x, this.y, this.w, this.h);
        textSize(this.tS);
        fill(198, 61, 15);
        text(this.name, this.x, this.y + this.toffset);
        pop();
    }
    
    this.hover = function() {
        var sideXL = this.x - this.w / 2;
        var sideXR = this.x + this.w / 2;
        var sideYU = this.y - this.h / 2;
        var sideYD = this.y + this.h / 2;
        if(mouseX > sideXL && mouseX < sideXR && mouseY > sideYU && mouseY < sideYD) {
            if(mouseIsPressed) {
                //Need a better way to do this!
                switch(this.click) {
                    case 1:
                        startPlaying(true);
                        break;
                    case 2:
                        startPlaying(false);
                        break;
                    case 3:
                        restart();
                        break;
                }
            }
            return true;
        } else {
            return false;
        }
    }
}