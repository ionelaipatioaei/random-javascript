var pointSize;

var numbers = [
    function() {
        ellipse(width / 2, height / 2, pointSize, pointSize);
    },

    function() {
        ellipse(width / 2 - width / 4, height / 2 - height / 4, pointSize, pointSize);
        ellipse(width / 2 + width / 4, height / 2 + height / 4, pointSize, pointSize);
    },

    function() {
        ellipse(width / 2 - width / 4, height / 2 - height / 4, pointSize, pointSize);
        ellipse(width / 2, height / 2, pointSize, pointSize);
        ellipse(width / 2 + width / 4, height / 2 + height / 4, pointSize, pointSize);
    },

    function() {
        ellipse(width / 2 - width / 4, height / 2 - height / 4, pointSize, pointSize);
        ellipse(width / 2 + width / 4, height / 2 - height / 4, pointSize, pointSize);
        ellipse(width / 2 - width / 4, height / 2 + height / 4, pointSize, pointSize);
        ellipse(width / 2 + width / 4, height / 2 + height / 4, pointSize, pointSize);
    },

    function() {
        ellipse(width / 2 - width / 4, height / 2 - height / 4, pointSize, pointSize);
        ellipse(width / 2 + width / 4, height / 2 - height / 4, pointSize, pointSize);
        ellipse(width / 2, height / 2, pointSize, pointSize);
        ellipse(width / 2 - width / 4, height / 2 + height / 4, pointSize, pointSize);
        ellipse(width / 2 + width / 4, height / 2 + height / 4, pointSize, pointSize);

    },

    function() {
        ellipse(width / 2 - width / 4, height / 2, pointSize, pointSize);
        ellipse(width / 2 + width / 4, height / 2, pointSize, pointSize);
        ellipse(width / 2 - width / 4, height / 2 - height / 4, pointSize, pointSize);
        ellipse(width / 2 + width / 4, height / 2 - height / 4, pointSize, pointSize);
        ellipse(width / 2 - width / 4, height / 2 + height / 4, pointSize, pointSize);
        ellipse(width / 2 + width / 4, height / 2 + height / 4, pointSize, pointSize);
    }
];

var pickedNumber = 0;

function setup() {
    createCanvas(800, 800);
    frameRate(30);
    pointSize = width / 8;
}

function draw() {
    background(116, 175, 173);
    fill(255);
    rect(pointSize - 16, pointSize - 16, (width - pointSize * 2) + 32, (height - pointSize * 2) + 32, 20);

    fill(0);
    numbers[pickedNumber]();
}

function mousePressed() {
    let number = Math.floor(random(0, 6));
    if(mouseX > pointSize - 16 && mouseX < width - pointSize / 2 && mouseY > pointSize - 16 && mouseY < height - pointSize / 2) {
        pickedNumber = number;
    }
}
