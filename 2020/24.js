/**
 * Second part way too slow, optimize it (each flip put all related neighbour into array, next flip just flip these related tiles)
 */
const fs = require('fs');

let minX = 0;
let maxX = 0;
let minY = 0;
let maxY = 0;
let minZ = 0;
let maxZ = 0;

const dayFirst = (input) => {
    const tileBlack = getTileBlack(input);

    return tileBlack.size;
};

const getTileBlack = (input) => {
    const tileBlack = new Map();
    const result = input.forEach(data => {
        let x = 0;
        let y = 0;
        let z = 0;
        data.forEach(item => {
            if (item === 'ne') {
                y--;
                z++;
            }
            if (item === 'e') {
                x++;
                y--;
            }
            if (item === 'se') {
                x++;
                z--;
            }
            if (item === 'nw') {
                x--;
                z++;
            }
            if (item === 'w') {
                x--;
                y++;
            }
            if (item === 'sw') {
                y++;
                z--;
            }
        });
        setEdge(x, y, z);
        let tile = x + '/' + y + '/' + z;
        if (tileBlack.has(tile)) {
            tileBlack.delete(tile);
        } else {
            tileBlack.set(tile, [x, y, z]);
        }
    });
    return tileBlack;
};

const setEdge = (x, y, z) => {
    maxX = (x > maxX) ? x : maxX;
    minX = (x < minX) ? x : minX;
    maxY = (y > maxY) ? y : maxY;
    minY = (y < minY) ? y : minY;
    maxZ = (z > maxZ) ? z : maxZ;
    minZ = (z < minZ) ? z : minZ;
}

const daySecond = (input) => {
    let tileBlack = getTileBlack(input);
    // console.log(tileBlack);
    for (let i=0; i<100; i++) {
        tileBlack = flip(tileBlack);
    }
    return tileBlack.size;
};

const flip = (tileBlack) => {
    const result = new Map(tileBlack);
    maxX++;
    minX--;
    maxY++;
    minY--;
    maxZ++;
    minZ--;
    for(let x=minX; x<=maxX; x++) {
        for (let y=minY; y<=maxY; y++) {
            for (let z=minZ; z<=maxZ; z++) {
                let index = x + '/' + y + '/' + z;
                let originTile = 'white';
                if (tileBlack.has(index)) {
                    originTile = 'black';
                }
                let neighbours = getNeighbours(x, y, z);
                let blackNeighbours = neighbours.filter(item => tileBlack.has(item));

                if (originTile === 'black' && (blackNeighbours.length === 0 || blackNeighbours.length > 2)) {
                    result.delete(index);
                } else if (originTile === 'white' && blackNeighbours.length === 2) {
                    result.set(index, [x, y]);
                }
            }
        }
    }
    return result;
};

const getNeighbours = (x, y, z) => {
    return [
        (x+1) + '/' + (y-1) + '/' + (z),
        (x) + '/' + (y-1) + '/' + (z+1),
        (x-1) + '/' + (y) + '/' + (z+1),
        (x-1) + '/' + (y+1) + '/' + (z),
        (x) + '/' + (y+1) + '/' + (z-1),
        (x+1) + '/' + (y) + '/' + (z-1),
    ]
};

let input = fs.readFileSync('input/24.txt').toString().split("\n").map(data => {
    let partOne = data.match(/ne|nw|se|sw|e|w/g);
    return partOne;
});

result = daySecond(input);
console.log('result: ' + result);