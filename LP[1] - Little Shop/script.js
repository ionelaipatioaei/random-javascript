"use strict";

const tax = 0.09;
const pricePhone = [99.99, 134.56, 345.98, 766.98];
const priceAcc = [9.99, 10.54, 15.90, 23.78];
const code = [244, 147, 566, 421];

(function show(){
    for(let i = 0; i < pricePhone.length; i++) {
        document.write("<p>Phone " + (i + 1) + " costs $" + pricePhone[i] + " and an accessory costs $" + priceAcc[i] + "</p>");
        document.write("<p>Product CODE: " + code[i] + "</p>");
    }
})();

var budget = prompt("What's you budget?");
budget = parseInt(budget);
document.write("<p>You have $" + budget + "</p>");

var acc = confirm("Do you want an accessory for every phone?");
if(acc == true) {
    document.write("<p>Accessory: YES" + "</p>");
} else {
    document.write("<p>Accessory: NO" + "</p>");
}

var amount = prompt("How many products do you want to buy?");
amount = parseInt(amount);
document.write("<p>I want " + amount + " products!" + "</p>");

var phoneType = prompt("Insert your phone code!");
phoneType = parseInt(phoneType);
var selectedPhone;
function checkCode() {
    switch(phoneType) {
        case 244:
            document.write("<p>You selected phone 1.</p>");
            selectedPhone = 0;
            break;
        case 147:
            document.write("<p>You selected phone 2.</p>");
            selectedPhone = 1;
            break;
        case 566:
            document.write("<p>You selected phone 3.</p>"); 
            selectedPhone = 2;
            break;
        case 421:
            document.write("<p>You selected phone 4.</p>");
            selectedPhone = 3;
            break;
        default:
            document.write("<p>You inserted a wrong code. Try again!.</p>");
            selectedPhone = 4;
    }
}
checkCode();
while(selectedPhone == 4) {
    phoneType = prompt("Insert your phone code!");
    phoneType = parseInt(phoneType);
    checkCode();
}

function calculatePrice() {
    let price;
    if(acc == true) {
        price = (pricePhone[selectedPhone] + priceAcc[selectedPhone]) * amount;
        return price;
    } else {
        price = pricePhone[selectedPhone] * amount;
        return price;
    }
}

function moneyLeft(par1) {
    if(par1 == true) {
        return budget - calculatePrice();
    } else {
        return calculatePrice() - budget;
    }
}

if(budget > calculatePrice()) {
    if(acc == true) {
        document.write("<p>You bought " + amount + " phones and accessories for $" + calculatePrice() + "</p>");
        document.write("<p>Money left $" + moneyLeft(true) + "</p>");
    } else {
        document.write("<p>You bought " + amount + " phones for $" + calculatePrice().toFixed(2) + "</p>");
        document.write("<p>Money left $" + moneyLeft(true) + "</p>");
    }
} else {
    document.write("<p>You don't have enough money!" + "</p>");
    document.write("<p>Just $" + moneyLeft(false).toFixed(2) + " more.</p>");
}
