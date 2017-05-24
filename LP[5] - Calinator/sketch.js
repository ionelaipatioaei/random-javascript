/*
Custom game written by Aipatioaei Ionel
Optimization needed!
*/

var cloudX;
var cloudY;

var player;
var choosedPlayer;
var obs = [];

var playerImg;
var playerImgM;
var playerImg2;
var playerImg2M;
var playerImg3;
var playerImg3M;

var check;
var cloud;

var score = 0;
var life = 50;
var speed = 3;

var play = false;
var gameOver = false;

function preload() {
    playerImg = loadImage("imgs/player.png");
    playerImgM = loadImage("imgs/playerM.png");
    playerImg2 = loadImage("imgs/player2.png");
    playerImg2M = loadImage("imgs/player2M.png");
    playerImg3 = loadImage("imgs/player3.png");
    playerImg3M = loadImage("imgs/player3M.png");
    check = loadImage("imgs/check.png");
    cloud = loadImage("imgs/cloud.png");
}

function setup() {
    createCanvas(900, 550);
    frameRate(60);
    
    player = new Player();
    
    obs.push(new Obstacle());
    
    cloudX = width + 100;
    cloudY = height / 2;
}

function draw() {
    background(235);
    
    textSize(30);
    textFont("Courier New");
    textStyle(BOLD);

    if(!play) {
        //Text
        genCloud();
        
        text("Calinator", width / 2 - 80, 30);
        line(0, 40, width, 40);
        
        push();
        fill(200, 100);
        noStroke();
        ellipse(width / 2 - 200, height / 2 - 130, 200, 200);  
        fill(0);
        textSize(100);
        text("CALINATOR", width / 2 - 260, height / 2 - 100);
        pop();
        
        push();
        rectMode(CENTER);
        if(mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
            fill(155);
            if(mouseIsPressed) {
                play = true;
            }
        }
        rect(width / 2, height / 2, 200, 50);
        pop();
        
        text("PLAY", width / 2 - 40, height / 2 + 10);
        image(playerImg, width / 2, height / 2 + 100);
        image(playerImg2, width / 2 - 150, height / 2 + 150);
        image(playerImg3, width / 2 + 150, height / 2 + 150);
        
        push();
        textAlign(CENTER);
        text("Călin", width / 2, height / 2 + 180);
        text("Ionescu", width / 2 - 150, height / 2 + 230);
        text("Pârțog", width / 2 + 150, height / 2 + 230);
        pop();
        
        choosePlayer();
        
        if(choosedPlayer == 1) {
            image(check, width / 2, height / 2 + 100);
        }
        if(choosedPlayer == 2) {
            image(check, width / 2 - 150, height / 2 + 150);
        }
        if(choosedPlayer == 3) {
            image(check, width / 2 + 150, height / 2 + 150);
        }
        
        line(0, height - 30, width, height - 30);
        
        push();
        textSize(20);
        text("Created by Aipatioaei Ionel.", 10, height - 10);
        pop();
    }
    
    if(play && !gameOver) {
        textSize(30);
        textFont("Courier New");
        textStyle(BOLD);
        text("Calinator", width / 2 - 80, 30);
        line(0, 40, width, 40);
        
        if(choosedPlayer == undefined) {
            push();
            fill(255, 0,  0);
            text("Player UNDEFINED, refresh and choose a player!", width / 2 - 410, 100);
            pop();
            
            player.y = 200;
        }
        
        //Here starts the action
        if(frameCount % 10 == 0) {
            score += 1;
        }
        text("Score:" + score, 10, 30);
        text("Life:" + life, width - 135, 30);
        
        //Scenery
        line(0, height - 20, width, height - 20);
        for(let i = 0; i < 20; i++) {
            point(random(width), random(height - 19, height));
        }
    
        genCloud();
        
        var lifeX = map(life, 0, 50, 0, 135);
        var lifeCol = map(life, 0, 50, 255, 0);
        push();
        noStroke();
        fill(lifeCol, 100, 0);
        rect(width, 35, -lifeX, 5);
        pop();
        
        var scoreX = map(score, 0, 1500, 0, 500);
        var scoreCol = map(score, 0, 1500, 0, 255);
        push();
        noStroke();
        fill(100, scoreCol, 0);
        rect(0, 35, scoreX, 5);
        pop();
       
        //Create new obstacle
        if(genObs()) {
            obs.push(new Obstacle());
        }
    
        for(let j = 0; j < obs.length; j++) {
            obs[j].show();
            obs[j].move();
            
            obs[j].increaseSpeed();
            
            if(obs[j].hit(player)) {
                life -= 1;
            }
        
            if(obs[j].delete()) {
                obs.splice(j, 1);
            }
        }
    
        player.show();
        player.move();
    
        if(keyIsPressed && player.y > height - 60) {
            player.jump();
        }
        
        if(score > 1500) {
            push();
            textAlign(CENTER);
            fill(255, 0, 0);
            text("ENDLESS MODE", width / 2, 75);
            pop();
        }
        
        if(life < 1) {
            gameOver = true;
        }
    }
    
    if(gameOver) {
        //Text
        textSize(30);
        textFont("Courier New");
        textStyle(BOLD);
        text("Calinator", width / 2 - 80, 30);
        line(0, 40, width, 40);
        
        push();
        rectMode(CENTER);
        fill(255);
        if(mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
            fill(155);
            if(mouseIsPressed) {
                gameOver = false;
                resetGame();
            }
        }
        rect(width / 2, height / 2, 200, 50);
        pop();
        
        push();
        textSize(50);
        text("GAME OVER!", width / 2 - 145, height / 2 - 120);
        pop();
        
        text("Your Score: " + score, width / 2 - 140, height / 2 - 50);
        text("RESET", width / 2 - 45, height / 2 + 10);
        
        push();
        rectMode(CENTER);
        fill(255);
        if(mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > (height / 2 + 100) - 25 && mouseY < (height / 2 + 100) + 25) {
            fill(155);
            if(mouseIsPressed) {
                gameOver = false;
                play = false;
                resetGame();
            }
        }
        rect(width / 2, height / 2 + 100, 200, 50);
        pop();
        
        text("MENU", width / 2 - 35, height / 2 + 110);
        line(0, height - 30, width, height - 30);
        
        push();
        textSize(20);
        text("Created by Aipatioaei Ionel.", 10, height - 10);
        pop();
    }
}

function resetGame() {
    score = 0;
    life = 50;
    speed = 3;
}

function genCloud() {
    imageMode(CENTER);
    cloudX -= speed;
    image(cloud, cloudX, cloudY);
    if(cloudX < -100) {
        cloudX = width + 100;
        cloudY = random(100, 400);
    }
}

function choosePlayer() {
    if(mouseIsPressed) {
        if(mouseX > width / 2 - 25 && mouseX < width / 2 + 25 && mouseY > height / 2 - 50 && mouseY > height / 2 + 50) {
            choosedPlayer = 1;
        }
        if(mouseX > width / 2 - 175 && mouseX < width / 2 - 125 && mouseY > height / 2 - 100 && mouseY > height / 2 + 100) {
            choosedPlayer = 2;
        }
        if(mouseX > width / 2 + 125 && mouseX < width / 2 + 175 && mouseY > height / 2 - 100 && mouseY > height / 2 + 100) {
            choosedPlayer = 3;
        }
    }
}

function genObs() {
    //let skip = random(0, 1) < 0.1 ? true : false;
    
    if(frameCount % Math.floor((350 / speed)) == 0) {
        return true;
    } else {
        return false;
    }
}

function Player() {
    this.x = 128;
    this.y = height / 2;
    
    this.gravity = 0.7;
    this.velocity = 0;
    this.lift = -15;
    
    this.show = function() {
        imageMode(CENTER);
        if(choosedPlayer == 1) {
            if(score % 2 != 0) {
                image(playerImg, this.x, this.y);
            } else {
                image(playerImgM, this.x, this.y);
            }
        }
        if(choosedPlayer == 2) {
            if(score % 2 != 0) {
                image(playerImg2, this.x, this.y);
            } else {
                image(playerImg2M, this.x, this.y);
            }
        }
        if(choosedPlayer == 3) {
            if(score % 2 != 0) {
                image(playerImg3, this.x, this.y);
            } else {
                image(playerImg3M, this.x, this.y);
            }
        }
    }
    
    this.move = function() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        if(this.y > height - 50) {
            this.y = height - 50;
            this.velocity = 0;
        }
    }
    
    this.jump = function() {
        if(this.y > height - 60) {
            this.velocity += this.lift;
        }
    }
}

function Obstacle() {
    this.x = width;
    this.y = random(500, 450);
    this.w = random(10, 60);
    this.col = random(0, 200);
    this.highlight = false;
    
    this.show = function() {
        push();
        fill(this.col);
        
        if(this.highlight) {
            fill(255, 0, 0);
        }
        rect(this.x, this.y, this.w, this.y, 10, 10, 0, 0);
        pop();
    }
    
    this.move = function() {
        this.x -= speed;
    }
    
    this.delete = function() {
        if(this.x < -100) {
            return true;
        } else {
            return false;
        }
    }
    
    this.increaseSpeed = function() {
        var value = [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10, 11, 12];
        var reqScore = [25, 50, 75, 100, 150, 200, 300, 400, 600, 800, 900, 1000, 1200, 1500];
        
        for(let i = 0; i < reqScore.length; i++) {
            if(reqScore[i] == score) {
                speed = value[i];
            }
        }
    }
    
    this.hit = function(player) {
        if(player.y + 25> this.y) {
            if(player.x + 12> this.x && player.x - 12< this.x + this.w) {
                this.highlight = true;
                return true;
            }
        }
        this.highlight = false;
        return false;
    }
}

function hack() {
    life = 100;
}