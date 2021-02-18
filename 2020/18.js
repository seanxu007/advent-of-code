/**
 * Regex match是取所有符合regex的字段放进一个array
 * Regex exec可以capture定义的regex里的group并放进一个array
 */
const fs = require('fs');


const dayFirst = (input) => {
    console.log(input.length);
    return input.map((question) => {
        console.log(question);
        let answer = calculate(question);
        console.log(answer);
        return answer;
    }).reduce((a, b) => a + b);
};

const calculate = (data) => {
    let tmp = data;
    let match = data.match(/(\([0-9| |+|*]+\))+/g);
    if (!match) {
        return plainCalculate(data);
    }
    for (let i=0; i<match.length; i++) {
        subResult = plainCalculate(match[i].substring(1, match[i].length -1));
        // console.log(match[i] + '----' + subResult);
        // console.log('tmp1: ' + tmp);
        // tmp.replace(match[i], subResult);
        tmp = tmp.replace(match[i], subResult);
        // console.log('tmp: ' + tmp);
    }
    // console.log('tmp: ' + tmp);
    return calculate(tmp);
}

const plainCalculate = (data) => {
    let result = 0;
    let calculator = null;
    let tmp = data.split(' ').filter((item) => {
        return item !== ' ';
    });
    for (let i=0; i<tmp.length; i++) {
        // console.log(result + ' ' + tmp[i]);
        if (['+', '*'].includes(tmp[i])) {
            calculator = tmp[i];
        } else {
            if (calculator === '*') {
                result = result * parseInt(tmp[i]);
            } else {
                result = result + parseInt(tmp[i]);
            }
        }
    }
    // console.log(data + ' ' + result);
    return result;
}


const daySecond = (input) => {
    return input.map((question) => {
        console.log(question);
        let answer = calculate2(question);
        console.log(answer);
        return answer;
    }).reduce((a, b) => parseInt(a) + parseInt(b));
};

const calculate2 = (data) => {
    let tmp = data;
    let match = data.match(/(\([0-9| |+|*]+\))+/g);
    if (!match) {
        return calculateWithoutParentheses(data);
    }
    for (let i=0; i<match.length; i++) {
        subResult = calculateWithoutParentheses(match[i].substring(1, match[i].length -1));
        // console.log(match[i] + '----' + subResult);
        // console.log('tmp1: ' + tmp);
        // tmp.replace(match[i], subResult);
        tmp = tmp.replace(match[i], subResult);
        // console.log('tmp: ' + tmp);
    }
    // console.log('tmp: ' + tmp);
    return calculate2(tmp);
}

const calculateWithoutParentheses = (data) => {
    let tmp = data;
    let match = data.match(/([\d]+ [+] [\d]+)+/g);
    if (!match) {
        return data.split('').filter((item) => item !== ' ').join('')
            .split('*').reduce((a, b) => parseInt(a) * parseInt(b));
    }
    for (let i=0; i<match.length; i++) {
        subResult = match[i].split('').filter((item) => item !== ' ').join('')
            .split('+').reduce((a, b) => parseInt(a) + parseInt(b));
        // console.log(match[i] + '----' + subResult);
        // console.log('tmp1: ' + tmp);
        // tmp.replace(match[i], subResult);
        tmp = tmp.replace(match[i], subResult);
        // console.log('tmp: ' + tmp);
    }
    // console.log('tmp: ' + tmp);
    return calculateWithoutParentheses(tmp);
}

let input = fs.readFileSync('input/18.txt').toString().split("\n").map((data) => {
    return data;
});

result = daySecond(input);
console.log('result: ' + result);