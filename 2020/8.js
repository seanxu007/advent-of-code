/**
 * Js array deep clone and regex match capture
 * 1. one dimension array clone can use newArray = [...array], but nested array can not
 * 2. regex need to use [] to define posible match, like [a-z], [+|-];
 * 3. use iterator is much better for a list of command
 */
const fs = require('fs');
const { arrayClone } = require('./utility/utility');


const makeCommandIterator = (input) => {
    let accumulator = 0;
    let runCommandIndex = [];
    let index = 0;
    const commandList = input;

    const commandIterator = {
        next:  () => {
            const command = commandList[index];
            if (!command) {
                return {done: true, break: false, accumulator: accumulator};
            }
            if (runCommandIndex.includes(index)) {
                return {done: true, break: true, accumulator: accumulator};
            }
            runCommandIndex.push(index);
            if (command[0] === 'acc') {
                accumulator = command[1] == '-' ? accumulator - parseInt(command[2]) : accumulator + parseInt(command[2]);
                index++;
            }
            if (command[0] === 'jmp') {
                index = command[1] == '-' ? index - parseInt(command[2]) : index + parseInt(command[2]);
            }
            if (command[0] === 'nop') {
                index++;
            }
            return {done: false};;
        }
    }
    return commandIterator;
}

const dayFirst = (input) => {
    const commandIterator = makeCommandIterator(input);
    let result = commandIterator.next();
    while (result.done !== true) {
        result = commandIterator.next();
    }
    return result;
};


const daySecond = (input) => {
    output = false;
    
    input.every((command, index) => {
        console.log('evety');
        let tempInput = arrayClone(input);
        // console.log(tempInput);
        if (command[0] === 'acc') {
            return true;
        }
        
        tempInput[index][0] = command[0] === 'jmp' ? 'nop' : 'jmp';

        accumulator = 0;
        runCommandIndex = [];
        result = dayFirst(tempInput);
        // tempInput[index][0] = command[0] === 'jmp' ? 'nop' : 'jmp';
        
        console.log(result);
        if (result.break === true) {
            output = result;
            return false;
        }
        return true;
    });
    return output;
};

let input = fs.readFileSync('input/test.txt').toString().split("\n").map(function (data) {
    match = /^([a-z]+) ([+|-])(\d+)$/g.exec(data);
    return [match[1], match[2], match[3]];
});

result = daySecond(input).accumulator;
console.log('result: ' + result);