/**
 * js object的使用逻辑，regex的capture group实现
 * 1. js array没有key，php才有，有key的是hashmap，所以js需要用object来处理key，value键值对；
 * 2. js object键值对的循环处理需要用for (const [key, value] of Object.entries(data))来处理；
 * 3. js array可以用reduce方法来编程object；
 * 
 * 4. regex用match无法capture group，用exec才行；
 */
const fs = require('fs');


const dayFirst = (input, requestColor) => {
    result = new Set();
    result = countParentBags(input, requestColor, result);
    
    return result.size
};

const countParentBags = (bagArray, requestColor, newBagArrayColors) => {
    tmpArray = [];
    for (let key in bagArray) {
        if (bagArray[key][requestColor]) {
            newBagArrayColors.add(key);
            tmpArray.push(key);
        }
    }

    for(let item of tmpArray) {
        newBagArrayColors.add(...countParentBags(bagArray, item, newBagArrayColors));
    }

    return newBagArrayColors;
};

const daySecond = (input, requestColor) => {
    resultData = countChildNumbers(input, requestColor);
    return resultData;
};


const countChildNumbers = (bagArray, requestColor, secondCount = 1) => {
    data = bagArray[requestColor];

    for (const [key, value] of Object.entries(data)) {
        secondCount += parseInt(value) * countChildNumbers(bagArray, key);
    }
    return secondCount;
}

const inputSerilize = (input) => {
    return input.reduce((result, bag) => {
        match = /^(.+) bags contain (.+).$/g.exec(bag);
        key = match[1];
        data = {};
        data = match[2].split(',').reduce((map, item) => {
            item = item.trim();
            childMatch = /^(\d+) (.+) bag/g.exec(item);  
            if (childMatch) {
                map[childMatch[2]] = childMatch[1];
            }
            return map;
        }, {});

        result[key] = data;
        return result;
    }, {});
};

let input = fs.readFileSync('input/7.txt').toString().split("\n");
input = inputSerilize(input);

result = daySecond(input, 'shiny gold')
console.log('result: ' + result);