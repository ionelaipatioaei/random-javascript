var button = [];

var playerGuess = "";
var lastTry;
var computerGuess = 0;
var score = 10;
var chance = 0;
var rounds = 0;
var strLen = 0;

var addNumber = [];

var guess = false;
//Unused
var gameOver = false;
var hint = "Check the number!";

var warn = 0;

function setup() {
    createCanvas(900, 600);
    frameRate(30);
    textFont("Courier New");
    textStyle(BOLD);

    for(let i = 0; i < 10; i++) {
        addNumber[i] = function() {
            if(strLen < 2) {
                playerGuess += i;
                strLen += 1;
            }
        }
    }
}

function draw() {
    background(239, 246, 245);
    update();

    drawGraphics();
    drawText();
}

function update() {
    if(!guess) {
        generateNumber();
        chance = 1;
    }
    if(score == 0) {
        gameOver = true;
    }
}

function drawText() {
    textAlign(CENTER);
    textSize(45);
    text("Guess the number", width / 2, 40);

    textSize(30);
    text("Your guess:", width / 2, 100);

    push();
    textAlign(LEFT);
    textSize(20);
    text("Hint: " + hint, 30, 470);

    textSize(40);
    text("Score: " + score, 30, 100);

    textSize(19);
    text("For every wrong guess", 30, 150);
    text("score goes down by 1.", 30, 180);
    text("For every correct guess", 30, 210);
    text("score goes up by 10.", 30, 240);

    text("Chance to guess the ", 30, 300);
    text("number randomly: " + chance.toFixed(1) + "%", 30, 330);

    text("You tried to guess the ", 630, 150);
    text("number " + rounds + " time(s).", 630, 180);

    text("Last try: " + lastTry, 630, 240);

    if(gameOver) {
        fill(255, 0, 0);
        textSize(180);
        textAlign(CENTER);
        text("YOU LOST", width / 2, height / 2);
    }
    pop();
}

function drawGraphics() {
    let posX = [30, 117, 204, 291, 378, 465, 552, 639, 726, 813];
    let col = color(174, 208, 207);
    let hoverCol = color(160, 173, 159);

    push();
    textSize(60);
    line(30, 60, width - 30, 60);

    line(30, 483, width - 30, 483);
    for(let i = 0; i < 10; i++) {
        button[i] = new Button(posX[i], 513, 57, 57, false, col, hoverCol, 250, addNumber[i]).show();
        text(i, posX[i] + 30, 560);
    }

    button[10] = new Button(width / 2 - 100, 340, 200, 50, false, col, hoverCol, 250, check).show();
    textSize(50);
    text("CHECK", width / 2, 380);
    button[11] = new Button(width / 2 - 75, 410, 150, 40, false, col, hoverCol, 250, reset).show();
    textSize(40);
    text("RESET", width / 2, 442);

    rectMode(CENTER);
    rect(width / 2, 220, 300, 200);

    textSize(200);
    fill(color(warn));
    text(playerGuess, width / 2, 280);
    pop();
}

function generateNumber() {
    computerGuess = Math.floor(random(0, 99.99));
}

function check() {
    guess = true;
    if(computerGuess == parseInt(playerGuess)) {
        hint = "Correct!";
        warn = color(0, 102, 0);
        guess = false;
        score += 10;
    } else if(computerGuess > parseInt(playerGuess)) {
        hint = "The number is too small.";
        wrongGuess();
    } else if(computerGuess < parseInt(playerGuess)) {
        hint = "The number is too big.";
        wrongGuess();
    }
}

function reset() {
    playerGuess = "";
    strLen = 0;
    warn = 0;
    if(hint == "Correct!") {
        hint = "Check the number!";
        guess = true;
    }
    score = 10;
    rounds = 0;
    gameOver = false;
}

function wrongGuess() {
    setTimeout(function(){
        chance = computerGuess / playerGuess;
        lastTry = playerGuess;
        playerGuess = "";
        strLen = 0;
    }, 500);
    warn = color(255, 0, 0);
    setTimeout(function(){
        warn = 0;
    }, 600);
    score--;
    rounds++;
}
