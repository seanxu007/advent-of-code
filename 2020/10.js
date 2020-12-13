/**
 * Maths of checking posible solutions (part one is pretty strict forward)
 * There are 2 solutions for part two
 * 1. spearate the initial array into a list of arrays, each array's end is next array's start -3
 * (ex: [1,2,3,5,8,9,10,13,15,18] => [[1,2,3,5],[8,9,10],[13,15],[18]]),
 * then calculate each array's posible from start to end, times all array's posible together
 * 原理：第一个和最后一个数字是必须出现的，相差3的数字也是必须出现的，分开计算每个必须出现的数字对的排列组合相乘就是整个数组的排列组合
 * 
 * 2. use Fibonacci to calculate posible combinations, example: [1,2,3,5,6,9]
 * {
 *  1: [2,3],
 *  2: [3,5],
 *  3: [5,6],
 *  5: [6],
 *  6: [9]
 * }
 * then posible(6-9) = 1, posible(5-9) = 1, posible(3-9) = posible(5-9) + posible(6-9) (because 3 can only get to 5 or 6) ....
 * finally get posible(1-9)
 * 
 */
const fs = require('fs');


const dayFirst = (input) => {
    input.push(0);
    input.push(Math.max(...input)+3);
    input = input.sort((a, b) => a - b);
    oneJ = input.filter((data, index) => {
        console.log((input[index+1] + ' ' + input[index]));
        return (input[index+1] - input[index]) === 1
    }).length;
    threeJ = input.filter((data, index) => {
        return (input[index+1] - input[index]) === 3
    }).length;
    console.log(oneJ);
    console.log(threeJ);

    return oneJ * threeJ;
};


const daySecond = (input) => {
    input.push(0);
    input = input.sort((a, b) => b - a);
    data = [];
    firstIndex = 0;
    input.forEach((value, index) => {
        if (input[index -1] - value === 3) {
            data.push(input.slice(firstIndex, index));
            firstIndex = index;
        }
        if (index == input.length-1) {
            data.push(input.slice(firstIndex, index+1));
        }
    });
    console.log('split array:');
    console.log(data);
    data = data.map((item) => {
        return posibleWay(item);
    });
    console.log('posible: ');
    console.log(data);
    return data.reduce((a, b) => a * b);
};

const posibleWay = (input) => {
    if (input.length <= 2) {
        return 1;
    }
    if (input.length >3 && (input[0] - input[3] <= 3)) {
        // console.log(3);
        return posibleWay(input.slice(1)) + posibleWay(input.slice(2)) + posibleWay(input.slice(3));
    }
    if (input.length >2 && (input[0] - input[2] <= 3)) {
        return posibleWay(input.slice(1)) + posibleWay(input.slice(2));
    }
    if (input[0] - input[1] <= 3) {
        return posibleWay(input.slice(1));
    }
}

const daySecondAnother = (input) => {
    input.push(0);
    input = input.sort((a, b) => a - b);
    console.log(input);
    arr = [1];
    for (i = 0; i < input.length; i++) {
        for (j = 0; j < i; j++) {
            console.log(i + ' ' + j);
            console.log(arr);
            if (input[i] - input[j] <= 3) {
                arr[i] = (arr[i] || 0) + arr[j];
            }
        }
    }
    console.log(arr);
    return arr[input.length-1];
};

let input = fs.readFileSync('input/10.txt').toString().split("\n").map(function (data) {
    return parseInt(data);
});

result = daySecond(input);
console.log('result: ' + result);