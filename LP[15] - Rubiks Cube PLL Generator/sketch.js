let size = 600;
let writeSpace = 150;
let gridSize = 2;

let currentPosition;
let startPosition = null;
let endPosition = null;

let corner = [];
let cornerOrientation1 = [];
let cornerOrientation2 = [];
let margin = [];
let marginOrientation1 = [];
let marginOrientation2 = [];

let name;
let algorithm;
let reset;

function setup() {
    rectMode(CENTER);
	createCanvas(size, size + writeSpace);

	name = createInput("Insert name").position(10, 10).size(250);
	algorithm = createInput("Insert algorithm").position(10, 50).size(250);
    reset = createButton("RESET").position(10, 100).mousePressed(resetValues);
}

function draw() {
	background(200);
    createGrid();
	drawCornerLine();
    drawMarginLine();
    alg();

    areaHover(0, width / 3, 0, size / 3, 0);
    areaHover(width / 3, width / 1.5, 0, size / 3, 1);
    areaHover(width / 1.5, width, 0, size / 3, 2);

    areaHover(0, width / 3, size / 3, size / 1.5, 3);
    areaHover(width / 1.5, width, size / 3, size / 1.5, 4);

    areaHover(0, width / 3, size / 1.5, size, 5);
    areaHover(width / 3, width / 1.5, size / 1.5, size, 6);
    areaHover(width / 1.5, width, size / 1.5, size, 7);
}

function mousePressed() {
    startPosition = currentPosition;
}

function mouseReleased() {
    endPosition = currentPosition;
}

function areaHover(startX, endX, startY, endY, pos) {
    if(mouseX > startX && mouseX < endX && mouseY > startY && mouseY < endY) {
        currentPosition = pos;
    } else if(mouseX > size / 3 && mouseX < size / 1.5 && mouseY > size / 3 && mouseY < size / 1.5 || mouseX > 0 && mouseX < width && mouseY > height - writeSpace && mouseY < height) {
        currentPosition = null;
    }
}

function createGrid() {
	strokeWeight(gridSize);
	//X-axis lines
	line(0, (height - writeSpace) / 3, width, (height - writeSpace) / 3);
	line(0, (height - writeSpace) / 1.5, width, (height - writeSpace) / 1.5);

	//Y-axis lines
	line(width / 3, 0, width / 3, height - writeSpace - 1);
	line(width / 1.5, 0, width / 1.5, height - writeSpace - 1);
}

function drawCornerLine() {
    let pos1 = [0, 2, 7, 5, 0, 2];
    let pos2 = [2, 7, 5, 0, 7, 5];

    fill(0);
    let pointSize = size / 10;

    for(let i = 0;  i < 6; i++) {
        if(startPosition == pos1[i] && endPosition == pos2[i] || startPosition == pos2[i] && endPosition == pos1[i]) {
            corner[i] = true;
            if(endPosition == pos2[i]) {
                cornerOrientation1[i] = true;
            } else if(endPosition == pos1[i]) {
                cornerOrientation2[i] = true;
            }
            startPosition = null;
            endPosition = null;
        }
    }

    let val1 = size / 2;
    let val2 = size / 6;
    let val3 = size / 1.2;

    //Hard-coded values
    let v1 = [val2, val3, val3, val2, val2, val3];
    let v2 = [val2, val2, val3, val3, val2, val2];
    let v3 = [val3, val3, val2, val2, val3, val2];
    let v4 = [val2, val3, val3, val2, val3, val3];

    let v5 = [val1, val3, val1, val2, val1, val1];
    let v6 = [val2, val1, val3, val1, val1, val1];

    for(let i = 0; i < 6; i++) {
        push();
        strokeWeight(size / 50);
        if(corner[i]) {
            line(v1[i], v2[i], v3[i], v4[i]);
            if(cornerOrientation1[i]) {
                push();
                stroke(100);
                line(v5[i], v6[i], v1[i], v2[i]);
                pop();
                rect(v3[i], v4[i], pointSize, pointSize, pointSize / 10);
            }
            if(cornerOrientation2[i]) {
                push();
                stroke(100);
                line(v5[i], v6[i], v3[i], v4[i]);
                pop();
                rect(v1[i], v2[i], pointSize, pointSize, pointSize / 10);
            }
        }
        pop();
    }
}


function drawMarginLine() {
    let pos1 = [1, 4, 6, 3, 1, 3];
    let pos2 = [4, 6, 3, 1, 6, 4];

    fill(127);
    let pointSize = size / 10;

    for(let i = 0;  i < 6; i++) {
        if(startPosition == pos1[i] && endPosition == pos2[i] || startPosition == pos2[i] && endPosition == pos1[i]) {
            margin[i] = true;
            if(endPosition == pos2[i]) {
                marginOrientation1[i] = true;
            } else if(endPosition == pos1[i]){
                marginOrientation2[i] = true;
            }
            startPosition = null;
            endPosition = null;
        }
    }

    let val1 = size / 2;
    let val2 = size / 6;
    let val3 = size / 1.2

    //Hard-coded values
    let v1 = [val1, val3, val1, val2, val1, val2];
    let v2 = [val2, val1, val3, val1, val2, val1];
    let v3 = [val3, val1, val2, val1, val1, val3];
    let v4 = [val1, val3, val1, val2, val3, val1];

    let v5 = [size / 1.5, size / 1.5, size / 3, size / 3, val1, val1];
    let v6 = [size / 3, size / 1.5, size / 1.5, size / 3, val1, val1];

    for(let i = 0; i < 6; i++) {
        push();
        fill(127);
        stroke(127);
        strokeWeight(size / 50);
        if(margin[i]) {
            line(v1[i], v2[i], v3[i], v4[i]);
            noStroke();
            if(marginOrientation1[i]) {
                push();
                stroke(50);
                line(v5[i], v6[i], v1[i], v2[i]);
                pop();
                ellipse(v3[i], v4[i], pointSize, pointSize);
            }
            if(marginOrientation2[i]) {
                push();
                stroke(50);
                line(v5[i], v6[i], v3[i], v4[i]);
                pop();
                ellipse(v1[i], v2[i], pointSize, pointSize);
            }
        }
        pop();
    }
}

function resetValues() {
    currentPosition = null;
    startPosition = null;
    endPosition = null;

    corner = [];
    cornerOrientation1 = [];
    cornerOrientation2 = [];
    margin = [];
    marginOrientation1 = [];
    marginOrientation2 = [];
}

function alg() {
    push();
    rectMode(CORNER);
    fill(255);
    noStroke();
    rect(0, size, width, writeSpace);
    pop();

    fill(0);
	textAlign(CENTER);
	textSize(writeSpace / 4);
	textFont("Helvetica");
	text(name.value(), width / 2, height - writeSpace / 1.75);
	textSize(writeSpace / 6);
	text(algorithm.value(), width / 2, height - writeSpace / 5);
}
