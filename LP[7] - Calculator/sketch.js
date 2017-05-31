var button = [];
var element = [];
var currentNumber = 0;
var number = ["", ""];
var operation = [false, false, false, false, false, false];
var result;
var delay = true;
var calcFinished = false;

function preload() {
    for(let i = 0; i < 19; i++) {
        element[i] = loadImage("imgs/element" + i + ".png");
    }
}

function setup() {
    createCanvas(401, 651);
    frameRate(30);
    textSize(60);
    textFont("Lucida Sans Unicode");
    textStyle(BOLD);
}

function draw() {
    background(126, 143, 124);
    
    screen();
    createButtons();
}

function screen() {
    push();
    noStroke();
    fill(228, 232, 227);
    rect(0, 0, 400, 150);
    pop();
    
    if(currentNumber == 0 && !calcFinished) {
        text(number[0], width - (number[0].length * 39), 140);
    } else if(currentNumber == 1 && !calcFinished) {
        text(number[0], width - (number[0].length * 39), 55);
        text(number[1], width - (number[1].length * 39), 140);
    }
    
    if(result != undefined) {
        push();
        textSize(90);
        text(result.toFixed(2), 10, 110);
        pop();
    }

    if(!calcFinished) {
        operation[0] ? text("+", width - 50, 94) : null;
        operation[1] ? text("-", width - 50, 94) : null;
        operation[2] ? text("/", width - 50, 94) : null;
        operation[3] ? text("*", width - 50, 107) : null;
    }
    
    (function drawLines() {
        //Top Line
        line(0, 0, width, 0);
        //Left Line
        line(0, 0, 0, 150);
        //Right Line
        line(width - 1, 0, width - 1, 150);
        
        if(!calcFinished && !operation[5] && !operation[4] && result == undefined) {
            line(10, 75, width - 60, 75);
        }
    })(); 
}

function createButtons() {
    let col = color(126, 143, 124);
    let hoverCol = color(198, 61, 15, 50);
    
    let buttonX = [0, 100, 200, 300, 0, 100, 200, 300, 0, 100, 200, 300, 0, 100, 200, 0, 100, 200];
    let buttonY = [150, 150, 150, 150, 250, 250, 250, 250, 350, 350, 350, 350, 450, 450, 450, 550, 550, 550];
    
    for(let i = 0; i < buttonX.length; i++) {
        button[i] = new Button(buttonX[i], buttonY[i], 100, 100, element[i], col, hoverCol, i).show();
    }
    //Special Button
    button[18] = new Button(300, 450, 100, 200, element[18], col, hoverCol, 18).show();
    
}

var actionButton = [
    function() {
        setOperation(5);
        calculate();
    },
    function() {
        setOperation(4);
        calculate();
    },
    function() {
        currentNumber = 1;
        setOperation(3);
    },
    function() {
        currentNumber = 1;
        setOperation(2);
    },
    
    function() {currentNumber == 0 ? number[0] += "7" : number[1] += "7";},
    function() {currentNumber == 0 ? number[0] += "8" : number[1] += "8";},
    function() {currentNumber == 0 ? number[0] += "9" : number[1] += "9";},
    function() {
        currentNumber = 1;
        setOperation(1);
    },
    
    function() {currentNumber == 0 ? number[0] += "4" : number[1] += "4";},
    function() {currentNumber == 0 ? number[0] += "5" : number[1] += "5";},
    function() {currentNumber == 0 ? number[0] += "6" : number[1] += "6";},
    function() {
        currentNumber = 1;
        setOperation(0);
    },
    
    function() {currentNumber == 0 ? number[0] += "1" : number[1] += "1";},
    function() {currentNumber == 0 ? number[0] += "2" : number[1] += "2";},
    function() {currentNumber == 0 ? number[0] += "3" : number[1] += "3";},
    
    function() {
        calcFinished = false;
        number[0] = "";
        number[1] = "";
        result = undefined;
        for(let i = 0; i < operation.length; i++) {
            operation[i] = false;
        }
        currentNumber = 0;
    },
    function() {currentNumber == 0 ? number[0] += "0" : number[1] += "0";},
    function() {
        if(number[0].indexOf(".") < 1 && currentNumber == 0) {
            number[0] += ".";
        }
        if(number[1].indexOf(".") < 1 && currentNumber == 1) {
            number[1] += ".";
        }
    },

    function() {
        calculate();
    }  
];

function calculate() {
    calcFinished = true;
    let num1 = parseFloat(number[0]);
    let num2 = parseFloat(number[1]);
    
    if(operation[0]) {
        result = num1 + num2;
    }
    if(operation[1]) {
        result = num1 - num2;
    }
    if(operation[2]) {
        result = num1 / num2;
    }
    if(operation[3]) {
        result = num1 * num2;
    }
    if(operation[4]) {
        result = Math.sqrt(num1);
    }
    if(operation[5]) {
        result = num1 * num1;
    }
}

function setOperation(op) {
    if(!operation[0] && !operation[1] && !operation[2] && !operation[3] && !operation[4] && !operation[5]) {
        operation[op] = true;
    }
}

function Button(posX, posY, sizeW, sizeH, img, color, hoverColor, action) {
    this.x = posX;
    this.y = posY;
    this.w = sizeW;
    this.h = sizeH;
    this.img = img;
    this.color = color;
    this.hoverColor = hoverColor;
    this.action = action;
    
    this.show = function() {
        push();
        fill(this.color);
        if(this.hover()) {
            fill(this.hoverColor);
        }
        rect(this.x, this.y, this.w, this.h);
        image(this.img, this.x, this.y);
        pop();
    }
    
    this.hover = function() {
        let sideL = this.x;
        let sideR = this.x + this.w;
        let sideU = this.y;
        let sideD = this.y + this.h;
        
        if(mouseX > sideL && mouseX < sideR && mouseY > sideU && mouseY < sideD) {
            if(mouseIsPressed && delay) {  
                actionButton[this.action]();
                resetDelay();
            }
            return true;
        } else {
            return false;  
        }
    }
}

function resetDelay() {
    delay = false;
    setTimeout(function() {delay = true;}, 250);
}