const fs = require('fs');


const dayFirst = (input) => {
    return input.map((data) => {
        splitData = data.split('\n').map((person) => {
            return person.split('');
        }).flat();
        console.log('splitData: ' + splitData);
        unique = [...new Set(splitData)];
        console.log('unique: ' + unique);
        return unique.length;
    }).reduce((a, b) => a + b);
};

const daySecond = (input) => {
    return input.map((data) => {
        persons = data.split('\n');
        splitData = persons.map((person) => {
            return person.split('');
        }).flat();
        intesection = splitData.filter((answer) => {
            for (let person of persons) {
                if (!person.includes(answer)) {
                    return false;
                }
            }
            return true;
        })
        unique = [...new Set(intesection)];
        console.log(unique);
        return unique.length;
    }).reduce((a, b) => a + b);
};

let input = fs.readFileSync('input/6.txt').toString().split("\n\n").map(function (data) {
    return data;
});

result = daySecond(input)
console.log('result: ' + result);