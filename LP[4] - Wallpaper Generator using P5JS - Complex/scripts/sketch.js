var finishSettings = false;

var generate;
var col;

function setup() {
    createImg("imgs/line3.png").position(600, 19);
    createCanvas(220, 220);
    backgroundProp();
    createImg("imgs/line1.png").position(10, 313);
    rectProp();
    createImg("imgs/line2.png").position(420, 320);
    ellipseProp();
    createImg("imgs/line1.png").position(10, 728);
    createImg("imgs/line2.png").position(847, 320);

    generate = createButton("GENERATE").size(100, 25).position(370, 740).mousePressed(genWallpaper);
}

function draw() {
    col = color(backgroundObj[2].value(), backgroundObj[3].value(), backgroundObj[4].value());

    if(!finishSettings) {
        background(col);
        fill(0);
        textSize(17);
        textFont("Courier New");
        text("Preview:", 10, 20);
        textSize(12);
        text("* - width defines the size", 10, 212);
        if(rectObj[0].checked()) {
            rectPreview();
        }
        if(ellipseObj[0].checked()) {
            ellipsePreview();
        }
    } else {
        genWallpaperCol();
        genRect();
        genEllipse();
    }
}

function genWallpaper() {
    finishSettings = true;
    createCanvas(backgroundObj[0].value(), backgroundObj[1].value()).position(0, 0);
}
