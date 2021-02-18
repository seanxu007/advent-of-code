/**
 * Always define the parameter (let or const) in functions, otherwise it might change the outside parameters
 * example: in function, result = {}, outside console result is not the right answer
 * 
 */
const fs = require('fs');


const dayFirst = (input) => {
    let obj = {};
    for (let x=0; x<input.length; x++) {
        data = input[x].split('');
        for (let y=0; y<data.length; y++) {
            obj[(x)+'/'+(y)+'/'+0] = data[y];
        }
    }
    // console.log(obj);
    minx = 0;
    maxx = input[0].length;
    miny = 0;
    maxy = input.length;
    minz = 0;
    maxz = 0;
    for (let i=0; i<6; i++) {
        minx--;
        maxx++;
        miny--;
        maxy++;
        minz--;
        maxz++;
        obj = round(obj, minx, maxx, miny, maxy, minz, maxz);
        
    }
    // console.log(obj);
    return Object.values(obj).filter((data) => data === '#').length;
};

const round = (obj, minx, maxx, miny, maxy, minz, maxz) => {
    result = {};
    for(let x=minx; x<=maxx; x++) {
        for(let y=miny; y<=maxy; y++) {
            for(let z=minz; z<=maxz; z++) {
                currentValue = obj[x+'/'+y+'/'+z] || '.';
                neighbour = getNeighbour(obj, x, y, z);
                activeNeighbour = neighbour.filter((data) => {
                    return data === '#';
                }).length;
                console.log(x+"/"+y+'/'+z+'------'+activeNeighbour);
                if (currentValue === '#') {
                    if (activeNeighbour === 2 || activeNeighbour === 3) {
                        result[x+'/'+y+'/'+z] = '#';
                    } else {
                        result[x+'/'+y+'/'+z] = '.';
                    }
                }
                if (currentValue === '.') {
                    if (activeNeighbour === 3) {
                        result[x+'/'+y+'/'+z] = '#';
                    } else {
                        result[x+'/'+y+'/'+z] = '.';
                    }
                }
            }
        }
    }
    return result;
};

const getNeighbour = (obj, x, y, z) => {
    let result = [];
    for (let i=-1; i<=1; i++) {
        for (let j=-1; j<=1; j++) {
            for (let m=-1; m<=1; m++) {
                if (i===0 && j===0 && m===0) {
                    continue;
                }
                result.push(obj[(x+i)+'/'+(y+j)+'/'+(z+m)] || '.');
            }
        }
    }
    return result;
}

const daySecond = (input) => {
    let obj = {};
    for (let x=0; x<input.length; x++) {
        data = input[x].split('');
        for (let y=0; y<data.length; y++) {
            obj[0+'/'+(x)+'/'+(y)+'/'+0] = data[y];
        }
    }
    // console.log(obj);
    minx = 0;
    maxx = input[0].length;
    miny = 0;
    maxy = input.length;
    minz = 0;
    maxz = 0;
    minh = 0;
    maxh = 0;
    for (let i=0; i<6; i++) {
        minx--;
        maxx++;
        miny--;
        maxy++;
        minz--;
        maxz++;
        minh--;
        maxh++;
        obj = round2(obj, minx, maxx, miny, maxy, minz, maxz, minh, maxh);
        
    }
    // console.log(obj);
    return Object.values(obj).filter((data) => data === '#').length;
};

const round2 = (obj, minx, maxx, miny, maxy, minz, maxz, minh, maxh) => {
    result = {};
    for (let h=minh; h<=maxh; h++) {
        for(let x=minx; x<=maxx; x++) {
            for(let y=miny; y<=maxy; y++) {
                for(let z=minz; z<=maxz; z++) {
                    currentValue = obj[h+'/'+x+'/'+y+'/'+z] || '.';
                    neighbour = getNeighbour2(obj, x, y, z, h);
                    activeNeighbour = neighbour.filter((data) => {
                        return data === '#';
                    }).length;
                    // console.log(h+'/'+x+"/"+y+'/'+z+'------'+activeNeighbour);
                    if (currentValue === '#') {
                        if (activeNeighbour === 2 || activeNeighbour === 3) {
                            result[h+'/'+x+'/'+y+'/'+z] = '#';
                        } else {
                            result[h+'/'+x+'/'+y+'/'+z] = '.';
                        }
                    }
                    if (currentValue === '.') {
                        if (activeNeighbour === 3) {
                            result[h+'/'+x+'/'+y+'/'+z] = '#';
                        } else {
                            result[h+'/'+x+'/'+y+'/'+z] = '.';
                        }
                    }
                }
            }
        }
    }
    
    return result;
};

const getNeighbour2 = (obj, x, y, z, h) => {
    let result = [];
    for (let n=-1; n<=1; n++) {
        for (let i=-1; i<=1; i++) {
            for (let j=-1; j<=1; j++) {
                for (let m=-1; m<=1; m++) {
                    if (i===0 && j===0 && m===0 && n===0) {
                        continue;
                    }
                    result.push(obj[(h+n)+'/'+(x+i)+'/'+(y+j)+'/'+(z+m)] || '.');
                }
            }
        }
    }
    return result;
}

let input = fs.readFileSync('input/17.txt').toString().split("\n").map(function (data) {
    return data;
});

result = daySecond(input);
console.log('result: ' + result);