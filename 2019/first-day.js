const fs = require('fs');

const day1First = (accumulator, input) => {
    currentValue = Math.floor(parseInt(input)/3)-2;
    console.log('currentValue: ' + currentValue);
    if (isNaN(currentValue)) {
        return accumulator;
    }
    return accumulator + currentValue;
};

const day1Second = (accumulator, input) => {
    currentValue = Math.floor(parseInt(input)/3)-2;
    if (isNaN(currentValue)) {
        return accumulator;
    }
    return accumulator + calculate(currentValue);
}

const calculate = (input) => {
    console.log(input);
    if (input <= 0) {
        return 0;
    }
    value = Math.floor(parseInt(input)/3)-2;
    return input + calculate(value);
}

let input = fs.readFileSync('input/first-day.txt').toString().split("\n");

let result = input.reduce(day1Second, 0);

console.log('result:' + result);