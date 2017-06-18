var backgroundObj = [];
var rectObj = [];
var ellipseObj = [];

var totalRect = 0;
var totalEllipse = 0;
let done = true;

function backgroundProp() {
    createElement("h2", "Background properties:").position(250, 57);
    createP("Size[px]:").position(250, 100);
    backgroundObj[0] = createInput("1920").position(250, 150);
    backgroundObj[1] = createInput("1080").position(400, 150);

    createP("Color[RGB]:").position(250, 175);
    backgroundObj[2] = createSlider(0, 255, 204).position(275, 220);
    backgroundObj[3] = createSlider(0, 255, 245).position(275, 250);
    backgroundObj[4] = createSlider(0, 255, 255).position(275, 280);
}

function rectProp() {
    rectObj[0] = createCheckbox("", false).position(10, 323);
    createElement("h2", "Rectangle properties:").position(35, 300);
    createP("Size[MIN - MAX px]:").position(10, 340);
    rectObj[1] = createCheckbox("", false).position(10, 390);
    createP("Square?*").position(35, 374);
    createP("Width:").position(10, 410);
    rectObj[2] = createInput("10").position(90, 425);
    rectObj[3] = createInput("100").position(240, 425);
    createP("Height:").position(10, 450);
    rectObj[4] = createInput("10").position(90, 465);
    rectObj[5] = createInput("100").position(240, 465);

    createP("Color[MIN - MAX RGBA]:").position(10, 485);
    rectObj[6] = createInput("0").position(35, 535);
    rectObj[7] = createInput("255").position(185, 535);
    rectObj[8] = createInput("0").position(35, 575);
    rectObj[9] = createInput("255").position(185, 575);
    rectObj[10] = createInput("0").position(35, 615);
    rectObj[11] = createInput("255").position(185, 615);
    rectObj[12] = createInput("0").position(35, 655);
    rectObj[13] = createInput("255").position(185, 655);

    createP("Amount:").position(10, 680);
    rectObj[14] = createInput("100").position(90, 695);
}

function rectPreview() {
    rectMode(CENTER);
    fill(backgroundObj[2].value(), 0, 255, 122);
    noStroke();
    if(rectObj[1].checked()) {
        rect(width/4, height/4, 50, 50);
    } else {
        rect(width/4, height/4, 90, 50);
    }
}

function genRect() {
    if(rectObj[0].checked() && totalRect < rectObj[14].value()) {
        let sizeX = floor(random(rectObj[2].value(), rectObj[3].value()));
        let sizeY = floor(random(rectObj[4].value(), rectObj[5].value()));
        if(rectObj[1].checked()) {
            sizeY = sizeX;
        }

        let colorR = floor(random(rectObj[6].value(), rectObj[7].value()));
        let colorG = floor(random(rectObj[8].value(), rectObj[9].value()));
        let colorB = floor(random(rectObj[10].value(), rectObj[11].value()));
        let colorA = floor(random(rectObj[12].value(), rectObj[13].value()));

        push();
        fill(colorR, colorG, colorB, colorA);
        rect(random(0, width), random(0, height), sizeX, sizeY);
        pop();
        totalRect++;
    }
}

function ellipseProp() {
    ellipseObj[0] = createCheckbox("", false).position(430, 323);
    createElement("h2", "Ellipse properties:").position(455, 300);
    createP("Size[MIN - MAX px]:").position(440, 340);
    ellipseObj[1] = createCheckbox("", false).position(440, 390);
    createP("Circle?*").position(465, 374);
    createP("Width:").position(440, 410);
    ellipseObj[2] = createInput("10").position(520, 425);
    ellipseObj[3] = createInput("100").position(670, 425);
    createP("Height:").position(440, 450);
    ellipseObj[4] = createInput("10").position(520, 465);
    ellipseObj[5] = createInput("100").position(670, 465);

    createP("Color[MIN - MAX RGBA]:").position(440, 485);
    ellipseObj[6] = createInput("0").position(465, 535);
    ellipseObj[7] = createInput("255").position(615, 535);
    ellipseObj[8] = createInput("0").position(465, 575);
    ellipseObj[9] = createInput("255").position(615, 575);
    ellipseObj[10] = createInput("0").position(465, 615);
    ellipseObj[11] = createInput("255").position(615, 615);
    ellipseObj[12] = createInput("0").position(465, 655);
    ellipseObj[13] = createInput("255").position(615, 655);

    createP("Amount:").position(440, 680);
    ellipseObj[14] = createInput("100").position(520, 695);
}

function ellipsePreview() {
    ellipseMode(CENTER);
    fill(255, backgroundObj[3].value(), 0, 122);
    noStroke();
    if(ellipseObj[1].checked()) {
        ellipse((width/4) * 3, height/4, 50, 50);
    } else {
        ellipse((width/4) * 3, height/4, 50, 90);
    }
}

function genEllipse() {
    if(ellipseObj[0].checked() && totalEllipse < ellipseObj[14].value()) {
        let sizeX = floor(random(ellipseObj[2].value(), ellipseObj[3].value()));
        let sizeY = floor(random(ellipseObj[4].value(), ellipseObj[5].value()));
        if(ellipseObj[1].checked()) {
            sizeY = sizeX;
        }

        let colorR = floor(random(ellipseObj[6].value(), ellipseObj[7].value()));
        let colorG = floor(random(ellipseObj[8].value(), ellipseObj[9].value()));
        let colorB = floor(random(ellipseObj[10].value(), ellipseObj[11].value()));
        let colorA = floor(random(ellipseObj[12].value(), ellipseObj[13].value()));

        push();
        fill(colorR, colorG, colorB, colorA);
        ellipse(random(0, width), random(0, height), sizeX, sizeY);
        pop();
        totalEllipse++;
    }
}

function genWallpaperCol() {
    push();
    fill(col);
    if(totalRect == 0 || totalEllipse == 0) {
        rect(0, 0, backgroundObj[0].value() * 2, backgroundObj[1].value() * 2);
    }
    if(totalRect == rectObj[14].value() && totalEllipse == ellipseObj[14].value() && done) {
        alert("Done! " + (totalRect + totalEllipse) + " shapes generated!");
        done = false;
    }
    pop();
}
