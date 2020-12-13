const fs = require('fs');

const dayFirst = (input) => {
    return input.filter(function (data) {
        low = parseInt(data[0].split('-')[0]);
        high = parseInt(data[0].split('-')[1]);
        validator = data[1][0];
        password = data[2];
        occor = (password.match(new RegExp(validator, "g")) || []).length;
        return occor >= low && occor <= high
    }).length;
};

const daySecond = (input) => {
    return input.filter(function (data) {
        low = parseInt(data[0].split('-')[0]);
        high = parseInt(data[0].split('-')[1]);
        validator = data[1][0];
        password = data[2];
        return (password[low-1] == validator || password[high-1] == validator) && (password[low-1] != password[high-1]);
    }).length;
};

let input = fs.readFileSync('input/2.txt').toString().split("\n").map(function (data) {
    return data.split(' ');
});

result = daySecond(input)
console.log('result: ' + result);