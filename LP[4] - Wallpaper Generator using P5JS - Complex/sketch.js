/*
Wallpaper Generator using P5JS by xLionel775
Yes I know, the code is bad
*/

var sizeX = prompt("Insert the width of the image!");
var sizeY = prompt("Insert the height of the image!");
var bgcolor = prompt("Insert the background color[HEX]!");

var obj = [];
var check = [];
var generate;
var gen = false;
var totalShapes = 0;
var totalRect = 0;
var totalEllipse = 0;
var totalTriangle = 0;

//Rectangle gen
function generateRect() {
    createElement("h2", "Rectangle properties:");
    createElement("h4", "Min and max width and height of the rectangle.");
    createP("MIN - MAX width");
    obj[3] = createInput("");
    obj[4] = createInput("");
    createP("MIN - MAX height");
    obj[5] = createInput("");
    obj[6] = createInput("");
    check[0] = createCheckbox("Square?", false);
    createElement("h4", "The color of the rectangles[0-255, RGBA].");
    createP("MIN - MAX amount of red");
    obj[7] = createInput("");
    obj[8] = createInput("");
    createP("MIN - MAX amount of green");
    obj[9] = createInput("");
    obj[10] = createInput("");
    createP("MIN - MAX amount of blue");
    obj[11] = createInput("");
    obj[12] = createInput("");
    createP("MIN - MAX opacity level[0 - full transparent, 255 - full opaque]");
    obj[13] = createInput("");
    obj[14] = createInput("");
    createP("");
    createElement("h4", "The amount of rectangles.");
    obj[15] = createInput("");
    
}

function drawRect() {
    let colorR = Math.floor(random(obj[7].value(), obj[8].value()));
    let colorG = Math.floor(random(obj[9].value(), obj[10].value()));
    let colorB = Math.floor(random(obj[11].value(), obj[12].value()));
    let colorA = Math.floor(random(obj[13].value(), obj[14].value()));
    let w = Math.floor(random(obj[3].value(), obj[4].value()));
    let h = Math.floor(random(obj[5].value(), obj[6].value()));
    
    noStroke();
    fill(colorR, colorG, colorB, colorA);
    if(check[0].checked()) {
        rect(random(width), random(height), w, w);
    } else {
        rect(random(width), random(height), w, h);
    }
}

//Ellipse Gen
function generateEllipse() {
    createElement("h2", "Ellipse properties:");
    createElement("h4", "Min and max width and height of the ellipse.");
    createP("MIN - MAX width");
    obj[16] = createInput("");
    obj[17] = createInput("");
    createP("MIN - MAX height");
    obj[18] = createInput("");
    obj[19] = createInput("");
    check[1] = createCheckbox("Circle?", false);
    createElement("h4", "The color of the ellipses[0-255, RGBA].");
    createP("MIN - MAX amount of red");
    obj[20] = createInput("");
    obj[21] = createInput("");
    createP("MIN - MAX amount of green");
    obj[22] = createInput("");
    obj[23] = createInput("");
    createP("MIN - MAX amount of blue");
    obj[24] = createInput("");
    obj[25] = createInput("");
    createP("MIN - MAX opacity level[0 - full transparent, 255 - full opaque]");
    obj[26] = createInput("");
    obj[27] = createInput("");
    createP("");
    createElement("h4", "The amount of ellipses.");
    obj[28] = createInput("");
}

function drawEllipse() {
    let colorR = Math.floor(random(obj[20].value(), obj[21].value()));
    let colorG = Math.floor(random(obj[22].value(), obj[23].value()));
    let colorB = Math.floor(random(obj[24].value(), obj[25].value()));
    let colorA = Math.floor(random(obj[26].value(), obj[27].value()));
    let w = Math.floor(random(obj[16].value(), obj[17].value()));
    let h = Math.floor(random(obj[18].value(), obj[19].value()));
    //console.log(colorR);
    
    noStroke();
    fill(colorR, colorG, colorB, colorA);
    if(check[1].checked()) {
        ellipse(random(width), random(height), w, w);
    } else {
        ellipse(random(width), random(height), w, h);
    }
}

function start() {
    gen = true;
}

function setup() {
    createCanvas(sizeX, sizeY);
    background(bgcolor);
    generateRect();
    generateEllipse();
    
    createP("");
    generate = createButton("Generate").mousePressed(start);
}

function draw() {
    if(gen && totalRect < parseInt(obj[15].value())) {
        drawRect();
        totalRect += 1;
    }
    
    if(gen && totalEllipse < parseInt(obj[28].value())) {
        drawEllipse();
        totalEllipse += 1;
    }
    
    var totalSet = parseInt(obj[15].value()) + parseInt(obj[28].value());
    total = totalRect + totalEllipse;
    
    if(total == totalSet) {
        noLoop();
        console.log("Finished!");
        alert("Finished!");
    }
    
    if(total != 0) {
        console.log(total);
    }
}