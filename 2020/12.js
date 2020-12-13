/**
 * 
 * 
 */
const fs = require('fs');


const dayFirst = (input) => {
    ew = 0;
    ns = 0;
    forward = 90;
    input.forEach((data) => {
        // console.log(data);
        if (data[0] === 'N') {
            ns += data[1];
        } else if (data[0] === 'S') {
            ns -= data[1];
        } else if (data[0] === 'E') {
            ew += data[1];
        } else if (data[0] === 'W') {
            ew -= data[1];
        } else if (data[0] === 'L') {
            forward -= data[1];
            forward = (forward + 360)%360;
            console.log(data);
            console.log(forward);
        } else if (data[0] === 'R') {
            forward += data[1];
            forward = (forward + 360)%360;
            console.log(data);

            console.log(forward);
        } else if (data[0] === 'F') {
            // console.log(forward);
            // if (forward % 90 !== 0) {
            //     console.log(forward);
            //     x = data[1] * Math.cos(forward);
            //     y = data[1] * Math.sin(forward);
            //     console.log(Math.cos(forward));
            // }
            if (forward === 90) {
                x = data[1];
                y=0;
            } else if (forward === 180) {
                x=0;
                y = -data[1];
            } else if (forward === 270) {
                x = -data[1];
                y=0;
            } else if (forward === 0) {
                x=0;
                y = +data[1];
            }
            
            ew += x;
            ns += y;
        }
        console.log(ew + '  ' + ns);
    });
    return Math.abs(ns) + Math.abs(ew);
};

const daySecond = (input) => {
    ew = 0;
    ns = 0;
    waypoint = {x: 10, y: 1};
    input.forEach((data) => {
        // console.log(data);
        if (data[0] === 'N') {
            waypoint.y += data[1];
        } else if (data[0] === 'S') {
            waypoint.y -= data[1];
        } else if (data[0] === 'E') {
            waypoint.x += data[1];
        } else if (data[0] === 'W') {
            waypoint.x -= data[1];
        } else if (data[0] === 'L') {
            degree = data[1] % 360;
            if (degree === 90) {
                tmp = waypoint.x;
                waypoint.x = -waypoint.y;
                waypoint.y = tmp;
            }
            if (degree === 180) {
                waypoint.x = -waypoint.x;
                waypoint.y = -waypoint.y;
            }
            if (degree === 270) {
                tmp = waypoint.x;
                waypoint.x = waypoint.y;
                waypoint.y = -tmp;
            }
        } else if (data[0] === 'R') {
            degree = data[1] % 360;
            if (degree === 270) {
                tmp = waypoint.x;
                waypoint.x = -waypoint.y;
                waypoint.y = tmp;
            }
            if (degree === 180) {
                waypoint.x = -waypoint.x;
                waypoint.y = -waypoint.y;
            }
            if (degree === 90) {
                tmp = waypoint.x;
                waypoint.x = waypoint.y;
                waypoint.y = -tmp;
            }
        } else if (data[0] === 'F') {
            ew += (waypoint.x * data[1]);
            ns += (waypoint.y * data[1]);
        }
        console.log(ew + '  ' + ns);
    });
    return Math.abs(ns) + Math.abs(ew);
};

let input = fs.readFileSync('input/12.txt').toString().split("\n").map(function (data) {
    return [data[0], parseInt(data.slice(1))];
});

result = daySecond(input);
console.log('result: ' + result);