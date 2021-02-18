/**
 * JS array slice(start, end) is generate new array from start to end, include start, not include end
 * JS splice会将原始array剪切一部分（原始array变了），剪切的部分作为一个新array返回
 */
const fs = require('fs');


const dayFirst = (input) => {
    let first = input[0];
    let second = input[1];
    
    while (first.length !== 0 && second.length !== 0) {
        a = first.splice(0, 1)[0];
        b = second.splice(0, 1)[0];
        if (a > b) {
            first.push(a, b);
        } else {
            second.push(b, a);
        }
    }

    result = first;
    if (first.length === 0) {
        result = second;
    }
    return result.reverse().reduce((prev, curr, index) => {
        return prev + curr * (index+1);
    });
};


const daySecond = (input) => {
    let first = input[0];
    let second = input[1];

    const [newFirst, newSecond] = game(first, second);

    console.log(newFirst);
    console.log(newSecond);

    result = newFirst.length !== 0 ? newFirst : newSecond;
    return result.reverse().reduce((prev, curr, index) => {
        return prev + curr * (index+1);
    });
};

const game = (first, second) => {
    const snapshots = [];
    
    while (first.length !== 0 && second.length !== 0) {
        snapshot = first.join(',') + '/' + second.join(',');
        if (snapshots.includes(snapshot)) {
            return [[...first, ...second], []];
        }
        snapshots.push(snapshot);

        let a = first.splice(0, 1)[0];
        let b = second.splice(0, 1)[0];
        let firstWin = true;
        
        if (a <= first.length && b <= second.length) {
            const [insideFirst, insideSecond] = game(first.slice(0, a), second.slice(0, b));
            if (insideFirst.length === 0) {
                firstWin = false;
            } else {
                firstWin = true;
            }
        } else if (a > b) {
            firstWin = true;
        } else if (b > a) {
            firstWin = false;
        }

        if (firstWin) {
            first.push(a, b);
        } else {
            second.push(b, a);
        }
    }
    return [first, second];
}

let input = fs.readFileSync('input/22.txt').toString().split("\n\n").map((data) => {
    // console.log(data);
    return data.split('\n').slice(1).map(Number);
});

result = daySecond(input);
console.log('result: ' + result);