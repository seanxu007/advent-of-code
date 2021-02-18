/**
 * object usage
 * Use object to store the last index that number is called,
 * each time get the index from object and calculate the next one
 * 
 */
const fs = require('fs');


const dayFirst = (input) => {
    return findNumber(input, 2020);
};

const findNumber = (input, n) => {
    let lastNum = input[input.length - 1];
    const lastIndex = {};
    input.forEach((v, i) => lastIndex[v] = i + 1);

    for (let i = input.length; i < n; i++) {
        const next = lastIndex[lastNum] ? i - lastIndex[lastNum] : 0;
        lastIndex[lastNum] = i;
        lastNum = next;
    }
    console.log(lastIndex);
    return lastNum;
}

const daySecond = (input) => {
    return findNumber(input, 30000000);
};

let input = fs.readFileSync('input/15.txt').toString().split(",")

result = dayFirst(input);
console.log('result: ' + result);