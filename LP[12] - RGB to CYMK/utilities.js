var delay = true;

function resetDelay(ms) {
    setTimeout(function() {
        delay = true;
    }, ms);
}

/*
If you don't want an image on the button set the img param to false or null.
Use ms for buttonDelay param. This function prevents the user to click the button multiple times on a second,
the function creates a delay between the clicks. The default value is 250 ms.
Only use functions for the action param.
*/
function Button(x, y, w, h, img, col, hoverCol, buttonDelay, action) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.col = col;
    this.hoverCol = hoverCol;
    this.buttonDelay = buttonDelay;
    this.action = action;

    this.show = function() {
        push();
        fill(this.col);
        if(this.hover()) {
            fill(this.hoverCol);
        }
        if(this.img != false && this.img != null) {
            image(img, this.x, this.y);
        }
        rect(this.x, this.y, this.w, this.h);
        pop();
    }

    this.hover = function() {
        let sideL = this.x;
        let sideR = this.x + this.w;
        let sideU = this.y;
        let sideD = this.y + this.h;

        if(mouseX > sideL && mouseX < sideR && mouseY > sideU && mouseY < sideD) {
            if(mouseIsPressed && delay) {
                delay = false;
                this.action();
                resetDelay(this.buttonDelay);
            }
            return true;
        } else {
            return false;
        }
    }
}
