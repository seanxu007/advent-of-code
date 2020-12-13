const fs = require('fs');

const dayFirst = (input) => {
    for(i=0; i<input.length; i++) {
        for(j=0; j<input.length; j++) {
            if (input[i]+input[j] == 2020) {
                return [input[i], input[j]];
            }
        }
    }
};

const daySecond = (input) => {
    for(i=0; i<input.length; i++) {
        for(j=0; j<input.length; j++) {
            for(m=0; m<input.length; m++) {
                if (input[i]+input[j] + input[m] == 2020) {
                    return [input[i], input[j], input[m]];
                }
            }
        }
    }
};

let input = fs.readFileSync('input/1.txt').toString().split("\n").map(function (data) {
    return parseInt(data);
});

result = daySecond(input)
console.log('result: ' + result.reduce((accumulator, currentValue) => accumulator * currentValue));