const fs = require('fs');


const dayFirst = (...input) => {
    return Math.max(...input);
};

const daySecond = (input) => {
    filteredData = input.filter((seat) => {
        if (!input.includes(seat+1) && input.includes(seat+2)) {
            return true;
        }
        if (!input.includes(seat-1) && input.includes(seat-2)) {
            return true;
        }
    });
    return filteredData.reduce((a, b) => a+b) / filteredData.length;
};

let input = fs.readFileSync('input/5.txt').toString().split("\n").map(function (data) {
    row = data.substring(0, data.length-3);
    column = data.substring(data.length-3);
    row = row.replace(/F/g, '0');
    row = row.replace(/B/g, '1');
    column = column.replace(/L/g, '0');
    column = column.replace(/R/g, '1');
    
    return parseInt(row, 2) * 8 + parseInt(column, 2);
});

result = daySecond(input)
console.log('result: ' + result);