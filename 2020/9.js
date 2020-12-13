/**
 * 
 */
const fs = require('fs');


const dayFirst = (input) => {
    for (let i=25; i<input.length; i++) {
        console.log('index: ' + i);
        newInput = [...input];
        result = validateNumber(newInput, input[i], i);
        if (!result) {
            // console.log(result);
            // console.log(input[i]);
            return input[i];
        }
    }
};

const validateNumber = (input, number, numberIndex) => {
    preamble = input.splice(numberIndex-25, 25);
    console.log(preamble);
    console.log(number);
    for (i=0; i<preamble.length; i++) {
        for (j=0; j<preamble.length; j++) {
            if (i === j) {
                continue;
            }
            if (preamble[i] + preamble[j] == number) {
                // console.log('a ' + preamble[i] + ' ' + preamble[j]);
                return true;
            }
        }
    }
    return false;

    // return preamble.some((item, index) => {
    //     for (i=0; i<preamble.length; i++) {
    //         if (i === index) {
    //             continue;
    //         }
    //         if ((item + preamble[i]) === number) {
    //             // console.log([item, preamble[i]]);
    //             return false;
    //         }
    //     }
    //     return true;
    // });
};


const daySecond = (input) => {
    result = 556543474;
    
    for (i=0; i<input.length; i++) {
        resultArray = [input[i]];
        sum = input[i];
        index = i;
        while (sum <= result) {
            index++;
            sum += input[index];
            resultArray.push(input[index]);
            if (sum === result) {
                console.log(resultArray);
                console.log(Math.max(resultArray));
                return Math.max(...resultArray) + Math.min(...resultArray);
            }
        }
    }
};

let input = fs.readFileSync('input/9.txt').toString().split("\n").map(function (data) {
    return parseInt(data);
});

result = daySecond(input);
console.log('result: ' + result);