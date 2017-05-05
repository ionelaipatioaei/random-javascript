"use strict";

const answers = [
    "Sure.", //Question
    "Whoa, chill out!", //YELLING
    "Bye, it was a pleasure to talk to you!", //Leave Gary :(
    "Fine, be that way!", //Anything
    "Whatever!" //Anything else
];

var talk = true;
var sentence;

function testSentence() {
    var test1 = sentence.charAt(sentence.length - 1);
    var test2 = sentence.toUpperCase();
    var test3 = "Bye!";
    var test4 = sentence.length - 1;
    
    if(test1 == "?") {
        return 0;
    }
    if(test2 == sentence) {
        return 1;
    } 
    if(test3 == sentence) {
        talk = false;
        return 2;
    } 
    if(test4 < 15) {
        return 3;
    } else {
        return 4;
    }
    
}

function write(text) {
    document.write("<h3>" + text + "</h3>");
}

while(talk == true) {
    let answer;
    
    sentence = prompt("Say something to Gary!");
    write("You: " + sentence);
    answer = testSentence();
    alert(answers[answer]);
    write("Gary: " + answers[answer]);
}

//156