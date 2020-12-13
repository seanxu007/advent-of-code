/**
 * 
 * 
 */
const fs = require('fs');


const dayFirst = (input) => {
    result = round(input);
    while (result.count !== 0) {
        result = round(result.result);
    }

    return result.result.flat().filter((seat) => {
        return seat === '#';
    }).length;
};

const round = (input) => {
    newArray = [];
    count = 0;
    for (let i = 0; i<input.length; i++) {
        row = input[i];
        let newRow = [...row];
        for(let j = 0; j<row.length; j++) {
            if (row[j] === '.') {
                continue;
            }
            judge = getNeighbours(input, i, j);
            
            occupied = judge.filter((neighbour) => {
                return neighbour === '#';
            });
            shouldOccupid = occupied.length === 0;
            shouldEmpty = occupied.length >=4;
            
            if (shouldOccupid && input[i][j] === 'L') {
                newRow[j] = '#';
                count++;
            }
            if (shouldEmpty && input[i][j] === '#') {
                newRow[j] = 'L';
                count++;
            }

        }
        newArray.push(newRow);
    }
    return {'result': newArray, 'count': count};
}

const getNeighbours = (input, i, j) => {
    return [
        getNeighbour(input, i, j, 0, -1),
        getNeighbour(input, i, j, 0, +1),
        getNeighbour(input, i, j, -1, -1),
        getNeighbour(input, i, j, -1, 0),
        getNeighbour(input, i, j, -1, 1),
        getNeighbour(input, i, j, 1, -1),
        getNeighbour(input, i, j, 1, 0),
        getNeighbour(input, i, j, 1, 1),
    ];
};

const getNeighbour = (input, i, j, iIncrement, jIncrement) => {
    if (input[i+iIncrement] && input[i+iIncrement][j+jIncrement]) {
        return input[i+iIncrement][j+jIncrement];
    }
    return null;
}

const daySecond = (input) => {
    result = round2(input);
    while (result.count !== 0) {
        result = round2(result.result);
    }

    return result.result.flat().filter((seat) => {
        return seat === '#';
    }).length;
};

const round2 = (input) => {
    newArray = [];
    count = 0;
    for (let i = 0; i<input.length; i++) {
        row = input[i];
        let newRow = [...row];
        for(let j = 0; j<row.length; j++) {
            if (row[j] === '.') {
                continue;
            }

            judge = getRayNeighbours(input, i, j);

            occupied = judge.filter((neighbour) => {
                return neighbour === '#';
            });
            shouldOccupid = occupied.length === 0;
            shouldEmpty = occupied.length >=5;
            
            if (shouldOccupid && input[i][j] === 'L') {
                newRow[j] = '#';
                count++;
            }
            if (shouldEmpty && input[i][j] === '#') {
                newRow[j] = 'L';
                count++;
            }

        }
        newArray.push(newRow);
        // console.log(newRow);
    }
    console.log(count);
    return {'result': newArray, 'count': count};
}

const getRayNeighbours = (input, i, j) => {
    return [
        getRayNeighbour(input, i, j, 0, -1),
        getRayNeighbour(input, i, j, 0, +1),
        getRayNeighbour(input, i, j, -1, -1),
        getRayNeighbour(input, i, j, -1, 0),
        getRayNeighbour(input, i, j, -1, 1),
        getRayNeighbour(input, i, j, 1, -1),
        getRayNeighbour(input, i, j, 1, 0),
        getRayNeighbour(input, i, j, 1, 1),
    ];
};

const getRayNeighbour = (input, i, j, iIncrement, jIncrement) => {
    while (true) {
        i += iIncrement;
        j += jIncrement;
        if (!input[i] || !input[i][j] || input[i][j] === 'L') {
            break;
        }
        if (input[i][j] === '#') {
            return input[i][j];
        }
    }
}

let input = fs.readFileSync('input/11.txt').toString().split("\n").map(function (data) {
    return data.split('');
});

result = daySecond(input);
console.log('result: ' + result);