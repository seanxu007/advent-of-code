const fs = require('fs');


const dayFirst = (input, rule = 3) => {
    return input.filter(function (data, key) {
        key = key*rule%(data.length);
        return data[key] == '#';
    }).length;  
};

const daySecond = (input) => {
    rule = [
        [1,1],
        [3,1],
        [5,1],
        [7,1],
        [1,2],
    ];
    rule = rule.map(function (data) {
        return dayFirst(input, data[0]/data[1]);
    });
    return rule.reduce((accumulator, currentValue) => accumulator * currentValue);
};

let input = fs.readFileSync('input/3.txt').toString().split("\n");

result = daySecond(input)
console.log('result: ' + result);