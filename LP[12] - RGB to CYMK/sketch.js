var cyanVal = 0;
var yellowVal = 0;
var magentaVal = 0;
var keyVal = 0;

var input = [];
var output = [];

function setup() {
    createCanvas(330, 330);
    frameRate(10);

    createP("RGB Value:").position(360, 0);
    output[0] = createP("CYMK Value(" + cyanVal + "%, " + yellowVal + "%, " + magentaVal + "%, " + keyVal + "%)").position(360, 170);

    for(let i = 0; i < 3; i++) {
        //input[i] = createInput("0").position(360, (i * 40) + 50);
        input[i] = createSlider(0, 255, 0).position(360, (i * 40) + 50);
        output[i + 5] = createP(input[i].value()).position(550, (i * 40) + 35);
    }

    output[1] = createP("Cyan: " + cyanVal).position(360, 200);
    output[2] = createP("Yellow: " + yellowVal).position(360, 235);
    output[3] = createP("Magenta: " + magentaVal).position(360, 270);
    output[4] = createP("Key(Black): " + keyVal).position(360, 305);

    createP("DISCLAIMER: Very poor convertion, don't use it for real applications!");
}

function draw() {
	background(input[0].value(), input[1].value(), input[2].value());
    convert();

    output[0].html("CYMK Value(" + floor(cyanVal) + "%, " + floor(yellowVal) + "%, " + floor(magentaVal) + "%, " + floor(keyVal) + "%)");
    output[1].html("Cyan: " + floor(cyanVal));
    output[2].html("Yellow: " + floor(yellowVal));
    output[3].html("Magenta: " + floor(magentaVal));
    output[4].html("Key(Black): " + floor(keyVal));

    for(let i = 0; i < 3; i++) {
        output[i + 5].html(input[i].value());
    }
}

function convert() {
    //let max = Math.max(cyanVal, yellowVal, magentaVal);

    cyanVal = map(input[0].value(), 0, 255, 100, 0);
    yellowVal = map(input[1].value(), 0, 255, 100, 0);
    magentaVal = map(input[2].value(), 0, 255, 100, 0);
    //keyVal = 100 - max;
}
