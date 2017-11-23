let size = 600;
let writeSpace = 150;
let gridSize = 2;

let count = 0;

let currentPosition;
let fillCell = [];
let cellOrientation = [];

let name;
let algorithm;

function setup() {
	createCanvas(size, size + writeSpace);
	for(let i = 0; i < 8; i++) {
		fillCell[i] = false;
		cellOrientation[i] = true;
	}

	name = createInput("Insert name").position(10, 10).size(250);
	algorithm = createInput("Insert algorithm").position(10, 50).size(250);
}

function draw() {
	background(255);
	createSquare();
	createGrid();
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
    if(cellOrientation[currentPosition] == null) {
        fillCell[currentPosition] = !fillCell[currentPosition];
    } else {
        if(count == 0) {
            fillCell[currentPosition] = !fillCell[currentPosition];
            count++;
        } else {
            cellOrientation[currentPosition] = !cellOrientation[currentPosition];
            count++;
        }
    }
    if(count == 2) {
        count = 0;
    }
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

function createSquare() {
	let squareSize = size / 3;

	push();
	noStroke();
	fill(127);

    function fillSquare(x, y, size, option1, option2, marginCell, type) {
    	if(option1) {
    		rect(x, y, size, size);
    	} else if(option2 && !marginCell) {
    		switch(type) {
    			case 0:
    				rect(x, y, size / 4, size);
    			break;

    			case 1:
    			    rect(x, y, size, size / 4);
    			break;

    			case 2:
    				rect(x + width / 4, y, size / 4, size);
    			break;

    			case 3:
    				rect(x, y, size / 4, size);
    			break;

    			case 4:
    				rect(x + width / 4, y, size / 4, size);
    			break;

    			case 5:
    				rect(x, y, size / 4, size);
    			break;

    			case 6:
    				rect(x, y + (height - writeSpace) / 4, size, size / 4);
    			break;

    			case 7:
    				rect(x + width / 4, y, size / 4, size);
    			break;
    		}
    	} else if(option2 && marginCell || !option2) {
    		switch(type) {
    			case 0:
    				rect(x, y, size, size / 4);
    			break;

    			case 1:
    				rect(x, y, size, size / 4);
    			break;

    			case 2:
    				rect(x, y, size, size / 4);
    			break;

    			case 3:
    				rect(x, y, size / 4, size);
    			break;

    			case 4:
    				rect(x + width / 4, y, size / 4, size);
    			break;

    			case 5:
    				rect(x, y + (height - writeSpace) / 4, size, size / 4);
    			break;

    			case 6:
    				rect(x, y + (height - writeSpace) / 4, size, size / 4);
    			break;

    			case 7:
    				rect(x, y + (height - writeSpace) / 4, size, size / 4);
    			break;
    		}
    	}
    }

	let xOption = [0, width / 3, width / 1.5, 0, width / 1.5, 0, width / 3, width / 1.5];
	let yOption = [0, 0, 0, (height - writeSpace) / 3, (height - writeSpace) / 3, (height - writeSpace) / 1.5, (height - writeSpace) / 1.5, (height - writeSpace) / 1.5];
	let margCell = [false, true, false, true, true, false, true, false];

	for(let i = 0; i < 8; i++) {
		fillSquare(xOption[i], yOption[i], squareSize, fillCell[i], cellOrientation[i], margCell[i], i);
        if(margCell[i]) {
            cellOrientation[i] = null;
        }
	}

	//Center piece, always filled
	rect(width / 3, (height - writeSpace) / 3, squareSize, squareSize);
	pop();
}

function alg() {
	fill(0);
	textAlign(CENTER);
	textSize(writeSpace / 4);
	textFont("Helvetica");
	text(name.value(), width / 2, height - writeSpace / 1.75);
	textSize(writeSpace / 6);
	text(algorithm.value(), width / 2, height - writeSpace / 5);
}
