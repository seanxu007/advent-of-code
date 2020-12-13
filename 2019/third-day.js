const fs = require('fs');

const calculate = (op, result) => {
    command = op.substring(0,1);
    length = op.substring(1);
    position = result[result.length-1];
    let [x,y] = position.split('/').map((item) => { return parseInt(item); });
    for(i=1; i<=length; i++) {
        if (command === 'U') {
            result.push(x + '/' + (y+i));
        }
        if (command === 'D') {
            result.push(x + '/' + (y-i));
        }
        if (command === 'L') {
            result.push((x-i) + '/' + y);
        }
        if (command === 'R') {
            result.push((x+i) + '/' + y);
        }
    }
    return result;
}

let [input1, input2] = fs.readFileSync('input/3.txt').toString().split("\n");

let wire1 = ['0/0'];

let wire2 = [...wire1];

input1.split(",").forEach((op) => {
    wire1 = calculate(op, wire1);
});

input2.split(",").forEach((op) => {
    wire2 = calculate(op, wire2);
});

// let cross = [...wire1].filter(x => wire2.indexOf(x) > 0);
// let shortDistance = false;
// cross.forEach(element => {
//     [x, y] = element.split('/').map(item => parseInt(item));
//     distance = Math.abs(x) + Math.abs(y);
//     if (distance < shortDistance || !shortDistance) {
//         shortDistance = distance;
//     }
// });

let lowestStep = false;
wire1.forEach((element, index) => {
    crossPoint = wire2.indexOf(element);
    if (crossPoint < 0) {
        return;
    }
    // console.log('crossPoint' + crossPoint);
    // console.log('index' + index);
    if (!lowestStep || lowestStep > (crossPoint + index)) {
        lowestStep = crossPoint + index;
        // console.log(lowestStep);
    }
    // console.log(lowestStep);
});

console.log(lowestStep);