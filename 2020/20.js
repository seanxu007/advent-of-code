/**
 *
 */
const fs = require('fs');

// optional function which is used to return null if value not exist
const optional = (array, ...keys) => {
    if (array === null) {
        return null;
    }
    let result = array;
    for (let key of keys) {
        if (array[key] === undefined) {
            return null;
        }
        result = array[key];
    }
    return result;
}


const dayFirst = (input) => {
    let tileLines = {};
    for (let [key, value] of Object.entries(input)) {
        tileLines[key] = getLines(value);
    }
    // console.log(tileLines);
    let result = 1;
    for (let [checkKey, checkValue] of Object.entries(tileLines)) {
        let matched = 0;
        for (let [key, value] of Object.entries(tileLines)) {
            if (checkKey === key) {
                continue;
            }
            let validateValue = Object.values(value);
            if (validateValue.includes(checkValue['up'])) {
                matched++;
            }
            if (validateValue.includes(checkValue['right'])) {
                matched++;
            }
            if (validateValue.includes(checkValue['bottom'])) {
                matched++;
            }
            if (validateValue.includes(checkValue['left'])) {
                matched++;
            }
        }

        if (matched === 2) {
            console.log(checkKey);
            result = result * checkKey;
        }
    }
    return result;
};

const getLines = (tile) => {
    const result = {
        up: tile[0].join(''),
        right: '',
        bottom: tile[tile.length-1].join(''),
        left: ''
    };
    for (let i=0; i<tile.length; i++) {
        result['right'] = result['right'] + tile[i][tile[0].length-1];
        result['left'] = tile[i][0] + result['left'];
    }
    result['reverseUp'] = result['up'].split('').reverse().join('');
    result['reverseRigit'] = result['right'].split('').reverse().join('');
    result['reverseBottom'] = result['bottom'].split('').reverse().join('');
    result['reverseLeft'] = result['left'].split('').reverse().join('');

    return result;
}


const daySecond = (input) => {

    result = generateImage(input);
    console.log(result);
};

const generateImage = (input) => {
    const result = [];
    let line = 0;
    while (result.flat().length !== input.length) {
        result.push([]);
        let column = 0;
        while (true) {
            console.log(result);
            console.log(line);
            console.log(column);
            console.log(optional(result, line-1, column));
            console.log(optional(result, line, column-1));
            console.log('--------');
            let [key, tile] = getTileByNeighbours(input, optional(result, line-1, column), optional(result, line, column-1));
            console.log(key);
            console.log(tile);
            if (key === null) {
                break;
            }
            result[line][column] = key;
            input[key] = tile;
            column++;
            break;
        }
        line++;
        break;
    }
};

const getTileByNeighbours = (input, top, left) => {
    console.log(top + '/' + left);
    if (top === null && left === null) {
        console.log('first');
        return getFirstTile(input);
    }

    let topLine = input[top] ? getLines(input[top])['bottom'] : null;
    let leftLine = input[left] ? getLines(input[left])['right'] : null;
    let [topSearchKey, topSearchLabel] = findLineMatch(topLine, input);
    let [leftSearchKey, leftSearchLabel] = findLineMatch(leftLine, input);

    if (topSearchKey === leftSearchKey && topSearchKey === null) {
        return [null, null];
    }
    let key = topSearchKey || leftSearchKey;
    let value = input[key];

    if (topSearchLabel === 'left' && leftSearchLabel === 'bottom') {
        value = rotate(value, 1);
    }
    if (topSearchLabel === 'bottom' && leftSearchLabel === 'right') {
        value = rotate(value, 2);
    }
    if (topSearchLabel === 'right' && leftSearchLabel === 'up') {
        value = rotate(value, 3);
    }

    if (topSearchLabel === 'reverseUp' && leftSearchLabel === 'reverseRight') {
        value = flip(value);
    }
    if (topSearchLabel === 'reverseRight' && leftSearchLabel === 'reverseBottom') {
        value = rotate(flip(value), 1);
    }
    if (topSearchLabel === 'reverseBottom' && leftSearchLabel === 'reverseLeft') {
        value = rotate(flip(value), 2);
    }
    if (topSearchLabel === 'reverseLeft' && leftSearchLabel === 'reverseUp') {
        value = rotate(flip(value), 3);
    }

    return [key, value];
};

const findLineMatch = (matchLine, input) => {
    for (let [key, value] of Object.entries(input)) {
        let lines = getLines(value);
        for (let [lineLabel, lineValue] of Object.entries(lines)) {
            if (lineValue === matchLine) {
                return [key, lineLabel];
            }
        }
    }
    return [null, null];
}

const getFirstTile = (input) => {
    let tilesWithLines = {};
    for (let [key, value] of Object.entries(input)) {
        tilesWithLines[key] = getLines(value);
    }

    for (let [checkKey, checkValue] of Object.entries(tilesWithLines)) {
        let matched = [];
        for (let [key, value] of Object.entries(tilesWithLines)) {
            if (checkKey === key) {
                continue;
            }
            let validateValue = Object.values(value);
            if (validateValue.includes(checkValue['up'])) {
                matched.push('up');
            }
            if (validateValue.includes(checkValue['right'])) {
                matched.push('right');
            }
            if (validateValue.includes(checkValue['bottom'])) {
                matched.push('bottom');
            }
            if (validateValue.includes(checkValue['left'])) {
                matched.push('left');
            }
        }

        if (matched.length === 2) {
            let times = 0;
            if (matched.includes('up') && matched.includes('right')) {
                times = 1;
            }
            if (matched.includes('left') && matched.includes('up')) {
                times = 2;
            }
            if (matched.includes('bottom') && matched.includes('left')) {
                times = 2;
            }
            console.log('times: ' + times)
            return [checkKey, rotate(input[checkKey], times)];
        }
    }
}

const flip = (tile) => {
    const result = [];
    for (let i=0; i<tile.length; i++) {
        for (let j=0; j<tile.length; j++) {
            result[i][(tile[i].length-1)-j] = tile[i][j];
        }
    }
    return result;
}

// 顺时针（0 < times < 4）
const rotate = (tile, times) => {
    if (times > 1) {
        tile = rotate(tile, times-1);
    }
    if (times === 1) {
        const result = [];
        for (let i=0; i<tile[0].length; i++) {
            let newLine = [];
            for (let j=tile.length-1; j>=0; j--) {
                newLine[j] = tile[j][i];
            }
            result.push(newLine);
        }
        console.log(times + 'rotate: ' + tile);
        console.log(times + 'rotate: ' + result);
        return result;
    }
    return tile;
}

const serializeInput = (input) => {
    const obj = {};
    input.forEach((data) => {
        let tmp = data.split('\n');
        let key = parseInt(tmp[0].replace('Tile ', '').replace(':', ''));
        // console.log(tmp.slice(1));
        let value = tmp.slice(1).map((line) => {
            return line.split('');
        });
        obj[key] = value;
    });
    // console.log(obj);
    return obj;
}

let input = fs.readFileSync('input/test.txt').toString().split("\n\n");

input = serializeInput(input);

result = daySecond(input);
console.log('result: ' + result);