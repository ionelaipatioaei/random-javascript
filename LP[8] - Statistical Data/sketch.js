/*
Written by Aipatioaei Ionel
*/

var input = [];

var Xi = [4, 5, 6, 7, 8, 9, 10];
var Ni = [];
var Fi = [];
var freqRelC = [];
var freqRelD = [];
var freqAbsC = [];
var freqAbsD = [];

var total;
var biggest;

var var2 = false;
var delay = true;

function setup() {
    createCanvas(775, 700);
    frameRate(20);
    
    for(let i = 0; i < 7; i++) {
        input[i] = createInput("").position(800, (40 * i) + 10).size(75, 20);
        createP("Elevi cu media " + (i + 4)).position(890, (40 * i) - 3);
    }
}

function draw() {
    background(255);
    
    drawLines();
    drawText();
    drawNumbers();
    
    update();
    
    drawGraph();
    button();
    drawRect();
}

function update() {
    total = Ni[0] + Ni[1] + Ni[2] + Ni[3] + Ni[4] + Ni[5] + Ni[6];
    for(let i = 0; i < 7; i++) {
        Ni[i] = parseInt(input[i].value());
        
        Fi[i] = Ni[i] / total;
    }
    
    biggest = Math.max(Ni[0], Ni[1], Ni[2], Ni[3], Ni[4], Ni[5], Ni[6]);
    
    //This is silly, need a better way to do it!
    freqAbsC[0] = Ni[0];
    freqAbsC[1] = Ni[0] + Ni[1];
    freqAbsC[2] = Ni[0] + Ni[1] + Ni[2];
    freqAbsC[3] = Ni[0] + Ni[1] + Ni[2] + Ni[3];
    freqAbsC[4] = Ni[0] + Ni[1] + Ni[2] + Ni[3] + Ni[4];
    freqAbsC[5] = Ni[0] + Ni[1] + Ni[2] + Ni[3] + Ni[4] + Ni[5];
    freqAbsC[6] = Ni[0] + Ni[1] + Ni[2] + Ni[3] + Ni[4] + Ni[5] + Ni[6];
    
    freqAbsD[0] = total;
    freqAbsD[1] = total - Ni[0];
    freqAbsD[2] = total - Ni[0] - Ni[1];
    freqAbsD[3] = total - Ni[0] - Ni[1] - Ni[2];
    freqAbsD[4] = total - Ni[0] - Ni[1] - Ni[2] - Ni[3];
    freqAbsD[5] = total - Ni[0] - Ni[1] - Ni[2] - Ni[3] - Ni[4];
    freqAbsD[6] = total - Ni[0] - Ni[1] - Ni[2] - Ni[3] - Ni[4] - Ni[5];
    
    freqRelC[0] = Fi[0];
    freqRelC[1] = Fi[0] + Fi[1];
    freqRelC[2] = Fi[0] + Fi[1] + Fi[2];
    freqRelC[3] = Fi[0] + Fi[1] + Fi[2] + Fi[3];
    freqRelC[4] = Fi[0] + Fi[1] + Fi[2] + Fi[3] + Fi[4];
    freqRelC[5] = Fi[0] + Fi[1] + Fi[2] + Fi[3] + Fi[4] + Fi[5];
    freqRelC[6] = Fi[0] + Fi[1] + Fi[2] + Fi[3] + Fi[4] + Fi[5] + Fi[6];

    freqRelD[0] = 1;
    freqRelD[1] = 1 - Fi[0];
    freqRelD[2] = 1 - Fi[0] - Fi[1];
    freqRelD[3] = 1 - Fi[0] - Fi[1] - Fi[2];
    freqRelD[4] = 1 - Fi[0] - Fi[1] - Fi[2] - Fi[3];
    freqRelD[5] = 1 - Fi[0] - Fi[1] - Fi[2] - Fi[3] - Fi[4];
    freqRelD[6] = 1 - Fi[0] - Fi[1] - Fi[2] - Fi[3] - Fi[4] - Fi[5];
}

function drawLines() {
    line(10, height / 2 + 100, width - 10, height / 2 + 100);
    line(width / 2, height / 2 + 110, width / 2, height - 10);
    
    //X-axis lines
    line(50, 100, width - 50, 100);
    line(50, 150, width - 50, 150);
    line(50, 200, width - 50, 200);
    line(50, 250, width - 50, 250);
    line(50, 300, width - 50, 300);
    line(50, 350, width - 50, 350);
    
    //Y-axis lines
    line(200, 50, 200, 400);
    line(275, 50, 275, 400);
    line(350, 50, 350, 400);
    line(425, 50, 425, 400);
    line(500, 50, 500, 400);
    line(575, 50, 575, 400);
    line(650, 50, 650, 400);
}

function drawText() {
    push();
    textSize(30);
    text("𝔁𝒾", 110, 90);
    text("𝓷𝒾", 110, 140);
    text("𝒇𝒾", 110, 190);
    
    textSize(15);
    text("Frecvența absolută", 60, 220);
    text("cumulată crescător", 60, 240);
    text("Frecvența absolută", 60, 270);
    text("cumulată descrescător", 45, 290);
    text("Frecvența relativă", 60, 320);
    text("cumulată crescător", 60, 340);
    text("Frecvența relativă", 60, 370);
    text("cumulată descrescător", 45, 390);
    
    text("Realizat de Aipătioaei Ionel", 595, 692);
    pop();
}

function drawNumbers() {
    let posX = [[225, 300, 375, 450, 525, 600, 660], [207, 282, 357, 432, 507, 582, 657], [238, 313, 388, 463, 538, 613, 688]];
    
    for(let i = 0; i < 7; i++) {
        push();
        textSize(50);
        text(Xi[i], posX[0][i], 90);
        pop();
        
        push();
        textSize(32);
        textAlign(CENTER);
        if(Ni[i] != undefined) {
            text(Ni[i], posX[2][i], 138);
        }
        pop();
        
        if(Fi[i] != undefined) {
            push();
            textSize(25);
            text(Fi[i].toFixed(3), posX[1][i], 185);
            pop();
        }
        
        push();
        textSize(32);
        textAlign(CENTER);
        if(freqAbsC[i] != undefined) {
            text(freqAbsC[i], posX[2][i], 238);
        }
        if(freqAbsD[i] != undefined) {
            text(freqAbsD[i], posX[2][i], 288);
        }
        pop();
        
        push();
        textSize(25);
        if(freqRelC[i] != undefined) {
            text(freqRelC[i].toFixed(3), posX[1][i], 335);
        }
        if(freqRelD[i] != undefined) {
            text(freqRelD[i].toFixed(3), posX[1][i], 385);
        }
        pop();
        pop();
    }
    pop();
    
    textSize(30);
    text("Total elevi: " + total, 520, 437);
}

function drawGraph() {
    let XiPos = [97, 122, 147, 172, 197, 222, 242];
    let NiPos = [];
    for(let i = 0; i < 7; i++) {
        NiPos[i] = (map(Ni[i], 0, biggest, 650, 510));
    }
    
    push();
    textSize(20);
    text("0", 60, 670);
    
    text("𝓷𝒾", 45, 480);
    line(75, 675, 75, 475);
    line(75, 475, 70, 485);
    line(75, 475, 80, 485);
    
    text("𝔁𝒾", 300, 675);
    line(50, 650, 300, 650);
    line(300, 650, 290, 645);
    line(300, 650, 290, 655);
    
    textSize(15);
    for(let i = 0; i < 7; i++) {
        text(Xi[i], XiPos[i], 670);
        strokeWeight(2);
        if(i == 6) {
            line(250, 650, 250, NiPos[6]);
            text(Ni[6], 50, NiPos[6] + 5);
            if(!var2) {
                push();
                stroke(42, 111, 103);
                strokeWeight(1);
                line(75, NiPos[6] - 1, XiPos[6] + 8, NiPos[6] - 1);
                pop();
            }
            continue;
        }
        line(XiPos[i] + 3, 650, XiPos[i] + 3, NiPos[i]);
        
        text(Ni[i], 50, NiPos[i] + 5);
        strokeWeight(2);
        
        if(!var2) {
            push();
            stroke(42, 111, 103);
            strokeWeight(1);
            line(75, NiPos[i] - 1, XiPos[i] + 3, NiPos[i] - 1);
            pop();
        }
        
        if(var2) {
            push();
            strokeWeight(1);
            line(100, NiPos[0] - 1, 125, NiPos[1] - 1);
            line(125, NiPos[1] - 1, 150, NiPos[2] - 1);
            line(150, NiPos[2] - 1, 175, NiPos[3] - 1);
            line(175, NiPos[3] - 1, 200, NiPos[4] - 1);
            line(200, NiPos[4] - 1, 225, NiPos[5] - 1);
            line(225, NiPos[5] - 1, 250, NiPos[6] - 1);
            pop();
        }
    }
    pop();
}

function button() {
    push();
    fill(255);
    if(mouseX > 225 && mouseX < 375 && mouseY > 462 && mouseY < 487) {
        fill(218, 241, 239);
        if(mouseIsPressed && !var2 && delay) {
            var2 = true;
            resetDelay();
        } else if(mouseIsPressed && var2 && delay){
            var2 = false;
            resetDelay();
        }
    }
    
    rect(225, 462, 150, 25);
    
    fill(0);
    textSize(18);
    if(!var2) {
        text("Rep. prin batoane", 230, 481);
    } else {
        textSize(15);
        text("Poligonul frecvențelor", 230, 480);
    }
    pop();
}

function resetDelay() {
    delay = false;
    setTimeout(function() {delay = true;}, 250);
}

function drawRect() {
    let col = [color(255, 0, 0), color(255, 102, 0), color(255, 204, 0), color(255, 255, 0), color(0, 255, 0), color(51, 204, 51), color(0, 102, 0)];
    let posY = [485, 510, 535, 560, 585, 610, 635];
    
    let FiPos = [];
    let FiPos2 = [];
    let percent = [];
    for(let i = 0; i < 7; i++) {
        percent[i] = Fi[i] * 100;
        FiPos[i] = ((percent[i] * 160) / 100);
    }
    
    FiPos2[0] = 650 - FiPos[0];
    FiPos2[1] = 650 - (FiPos[0] + FiPos[1]);
    FiPos2[2] = 650 - (FiPos[0] + FiPos[1] + FiPos[2]);
    FiPos2[3] = 650 - (FiPos[0] + FiPos[1] + FiPos[2] + FiPos[3]);
    FiPos2[4] = 650 - (FiPos[0] + FiPos[1] + FiPos[2] + FiPos[3] + FiPos[4]);
    FiPos2[5] = 650 - (FiPos[0] + FiPos[1] + FiPos[2] + FiPos[3] + FiPos[4] + FiPos[5]);
    FiPos2[6] = 650 - (FiPos[0] + FiPos[1] + FiPos[2] + FiPos[3] + FiPos[4] + FiPos[5] + FiPos[6]);

    rect(500, 490, 60, 160);
    
    textSize(20);
    text("𝒇𝒾", 435, 480);
    line(465, 675, 465, 475);
    line(465, 475, 460, 485);
    line(465, 475, 470, 485);
    
    line(440, 650, 600, 650);
    line(600, 650, 590, 645);
    line(600, 650, 590, 655);
    
    for(let i = 0; i < 7; i++) {
        let avg = i + 4;
        push();
        textSize(15);
        text("Elevi cu media " + avg, 640, posY[i] + 13);
        fill(col[i]);
        rect(620, posY[i], 15, 15);
        pop();
        
        push();
        textSize(13);
        text(percent[i].toFixed(1) + "%", 420, FiPos2[i] + 5);
        stroke(42, 111, 103);
        line(465, FiPos2[i], 500, FiPos2[i]);
        pop();
        
        push();
        fill(col[6 - i]);
        rect(500, FiPos2[6 - i], 60, FiPos[6 - i]);
        pop();
    }
}