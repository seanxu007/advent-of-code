/**
 * 
 */
const fs = require('fs');

const dayFirst = (input) => {
    const [card, door] = input;
    const subject = 7;

    let key = 1;
    let target = 1;
    while (target !== door) {
      target = (target * subject) % 20201227;
      key = (key * card) % 20201227;
    }
    return key;
};


const daySecond = (input) => {
    
};

let input = fs.readFileSync('input/25.txt').toString().split("\n").map(Number);

result = dayFirst(input);
console.log('result: ' + result);