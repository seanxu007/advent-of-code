const fs = require('fs');

const calculate = (input, index) => {
    if (typeof(input[index]) === 'undefined') {
        return input;
    }
    if (input[index] === 1) {
        input[input[index+3]] = input[input[index+1]] + input[input[index+2]];
        index += 4;
    } else if (input[index] === 2) {
        input[input[index+3]] = input[input[index+1]] * input[input[index+2]];
        index += 4;
    } else {
        return input;
    }
    return calculate(input, index);
}

let input = fs.readFileSync('input/2.txt').toString().split(',');

input = input.map(element => {
    return parseInt(element);
});

for(i=0; i<100; i++) {
    for(j=0; j<100; j++) {
        let newInput = [...input];
        newInput[1] = i;
        newInput[2] = j;
        result = calculate(newInput, 0);
        if (result[0] === 19690720) {
            console.log(i*100+j);
            break;
        }
    }
}
// input[1] = 12;
// input[2] = 2;

// input = calculate(input, 0);

// console.log(input);