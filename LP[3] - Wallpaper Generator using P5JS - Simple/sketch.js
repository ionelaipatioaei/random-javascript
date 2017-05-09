var slider1, slider2, slider3;

var canvasX = prompt("Insert the width of the image!");
var canvasY = prompt("Insert the heigt of the image!");
var bgcolor = prompt("Insert your color!");
var objects = prompt("Insert the amount of objects you want to have on image!");
var shape = confirm("OK for circles, CANCEL for rectangles!");

var total = 0;

function setup() {
    createCanvas(canvasX, canvasY);
    
    /* The background updates every frame and overrides the shapes! FIX NEEDED
    slider1 = createSlider(0, 255, 0);
    slider2 = createSlider(0, 255, 0);
    slider3 = createSlider(0, 255, 0);
    
    var red = slider1.value();
    var green = slider2.value();
    var blue = slider3.value();
    */
    
    background(color(bgcolor));
    
}

function draw() {
    var shapeGen = {
        model: random(0, 1),
        posX: random(0, width),
        posY: random(0, height),
        size: random(3, 255),
        col1: random(0, 255),
        col2: random(0, 255),
        col3: random(0, 255),
        opacity: random(0, 150)
    };
    fill(shapeGen.col1, shapeGen.col2, shapeGen.col3, shapeGen.opacity);
    noStroke();
    if(total < objects) {
        if(shape == true) {
            ellipse(shapeGen.posX, shapeGen.posY, shapeGen.size, shapeGen.size);
            total += 1;
        } else {
            rect(shapeGen.posX, shapeGen.posY, shapeGen.size, shapeGen.size);
            total += 1;
        }
    }
    if(total == objects) {
        console.log("Finished! Total shapes: ");
        alert("Finished! Total shapes: " + total);
        noLoop();
    }
    console.log(total);
}