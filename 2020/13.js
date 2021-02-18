/**
 * Use Chinese remainder theorem to calculate
 * a%b = c then (a+kb)%b = c
 * 
 */
const fs = require('fs');


const dayFirst = (input) => {
    start = parseInt(input[0]);
    buses = input[1].split(',').filter((data) => data !== 'X').map((data) => parseInt(data));

    bus = null;
    minutes = null;
    times = buses.forEach((data) => {
        tmp = data - (start % data);
        if (!minutes) {
            bus = data;
            minutes = tmp;
        }
        if (tmp < minutes) {
            bus = data;
            minutes = tmp;
        }
    });

    return bus * minutes;
};

const daySecond = (input) => {

    const data = input[1].split(',');
    let timestamp = 0
    let i = 0
    let foundation = 1
    while (i < data.length) {
        if (data[i] == 'x') i++
        else {
            if ((timestamp + i) % data[i] == 0) {
                foundation *= data[i]
                i++
            } else {
                timestamp += foundation
            }
        }
    }
    return timestamp;
};

let input = fs.readFileSync('input/13.txt').toString().split("\n").map(function (data) {
    return data;
});

result = daySecond(input);
console.log('result: ' + result);