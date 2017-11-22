let size = 600;
let writeSpace = 150;
let gridSize = 2;

let fillCell = [];
let cellOrientation = [];

let name;
let algorithm;

function setup() {
	createCanvas(size, size + writeSpace);
	for(let i = 0; i < 8; i++) {
		fillCell[i] = createCheckbox("Fill cell " + (i + 1), false).position(10, 30 * i + 10);
		//Very poor way to deal with this, I know, I know ...
		cellOrientation[i] = createCheckbox("", false).position(-100, -100);
	}
	cellOrientation[0] = createCheckbox("Side orientation", false).position(100, (30 * 0 + 10));
	cellOrientation[2] = createCheckbox("Side orientation", false).position(100, (30 * 2 + 10));
	cellOrientation[5] = createCheckbox("Side orientation", false).position(100, (30 * 5 + 10));
	cellOrientation[7] = createCheckbox("Side orientation", false).position(100, (30 * 7 + 10));

	name = createInput("Insert name").position(10, 280).size(250);
	algorithm = createInput("Insert algorithm").position(10, 320).size(250);
}

function draw() {
	background(255);
	createSquare();
	createGrid();
	alg();
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
				default:
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
				default:
			}
		}
	}
	
	//I need to find a better way to do this
	let xOption = [0, width / 3, width / 1.5, 0, width / 1.5, 0, width / 3, width / 1.5];
	let yOption = [0, 0, 0, (height - writeSpace) / 3, (height - writeSpace) / 3, (height - writeSpace) / 1.5, (height - writeSpace) / 1.5, (height - writeSpace) / 1.5];
	let margCell = [false, true, false, true, true, false, true, false];

	for(let i = 0; i < 8; i++) {
		fillSquare(xOption[i], yOption[i], squareSize, fillCell[i].checked(), cellOrientation[i].checked(), margCell[i], i);
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
