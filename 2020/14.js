/**
 * Max length of array is 2^32 - 1, so that array has been transfered into object (2^36 for second part)
 * 
 * part 2 get index solution
 * n = 'X' appear times, i from 0 - 2^n, i change to binary, use binary position (0/1) update 'X'
 * example i = 5, n = 5
 * i = 00101
 * first X change to 0, second to 0, third to 1, fourth to 0, third to 1
 * then one posible memory is there
 */
const fs = require('fs');


const dayFirst = (input) => {
    mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    memorys = [];
    input.forEach((data) => {
        // console.log(data);
        item = data.split('=').map((item) => item.trim());
        if (item[0] === 'mask') {
            mask = item[1];
        } else {
            index = item[0].replace('mem[', '').replace(']', '');

            value = calculate(mask, item[1]);
            memorys[index] = value;
        }
        
    });
    memorys = memorys.filter((data) => data !== null);
    return memorys.reduce((a, b) => a + b);
};

const calculate = (mask, input) => {
    input = parseInt(input).toString(2).padStart(36, '0');

    result = mask.split('').map((data, index) => {
        realIndex = index - input.length + 36;
        return data === 'X' ? (input[realIndex] || '0') : mask[index];
    }).join('');
    return parseInt(result, 2);
}

const daySecond = (input) => {
    mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    memorys = {};
    input.forEach((data) => {
        // console.log(data);
        item = data.split('=').map((item) => item.trim());
        if (item[0] === 'mask') {
            mask = item[1];
        } else {
            index = item[0].replace('mem[', '').replace(']', '');

            indexArray = getIndexArray(mask, index);

            value = parseInt(item[1]);

            indexArray.forEach((i) => {
                memorys[i] = value;
            });
        }
        
    });
    result = 0; 
    for (const [key, value] of Object.entries(memorys)) {
        result += parseInt(value);
    }
    return result;
};

const getIndexArray = (mask, input) => {
    input = parseInt(input).toString(2).padStart(36, '0');

    position = [];
    result = input.split('').map((data, index) => {
        if (mask[index] === '0') {
            return data;
        }
        if (mask[index] === '1') {
            return mask[index];
        }
        if (mask[index] === 'X') {
            position.push(index);
            return '0';
        }
    });

    results = [];
    for (let i = 0; i<Math.pow(2, position.length); i++) {
        newResult = [...result];
        t = i.toString(2).padStart(position.length, '0');
        for (let j = 0; j < position.length; j++) {
            newResult[position[j]] = t[j];
        }
        newResult = parseInt(newResult.join(''), 2);
        results.push(newResult);
    }

    return results;
}

let input = fs.readFileSync('input/14.txt').toString().split("\n").map(function (data) {
    return data;
});

result = daySecond(input);
console.log('result: ' + result);