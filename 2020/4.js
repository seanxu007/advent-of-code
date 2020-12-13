const fs = require('fs');


const dayFirst = (input) => {
    return input.filter(function (data) {
        passport = [];
        data = data.split('\n').map(function (tmp) {
            return tmp.split(' ');
        }).flat();
        data = data.map(function (tmp) {
            tmp = tmp.split([':']);
            passport[tmp[0]] = tmp[1];
        });
        if (passport['byr'] && passport['iyr'] && passport['eyr'] && passport['hgt'] && passport['hcl'] && passport['ecl'] && passport['pid']) {
            return true;
        }
        return false;
    }).length;
};

const daySecond = (input) => {
    return input.filter(function (data) {
        passport = [];
        data = data.split('\n').map(function (tmp) {
            return tmp.split(' ');
        }).flat();
        data = data.map(function (tmp) {
            tmp = tmp.split([':']);
            passport[tmp[0]] = tmp[1];
        });

        if (!passport['byr'] || !passport['iyr'] || !passport['eyr'] || !passport['hgt'] || !passport['hcl'] || !passport['ecl'] || !passport['pid']) {
            return false;
        }
        if (parseInt(passport['byr']) < 1920 || parseInt(passport['byr']) > 2002) {
            return false;
        }
        if (parseInt(passport['iyr']) < 2010 || parseInt(passport['iyr']) > 2020) {
            return false;
        }
        if (parseInt(passport['eyr']) < 2020 || parseInt(passport['eyr']) > 2030) {
            return false;
        }
        
        last = passport['hgt'].substring(passport['hgt'].length - 2);
        first = parseInt(passport['hgt'].substring(0, passport['hgt'].length-2));
        if (last == 'cm' && (first < 150 || first > 193)) {
            return false;
        }
        if (last == 'in' && (first < 59 || first > 76)) {
            return false;
        }
        if (last != 'cm' && last != 'in') {
            return false;
        }
        
        if (passport['hcl'][0] != '#') {
            return false;
        }
        if (!/^#[0-9a-r]{6}$/g.test(passport['hcl'])) {
            return false
        }
        if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport['ecl'])) {
            return false;
        }
        if (!/^[0-9]{9}$/g.test(passport['pid'])) {
            return false;
        }
        return true;
    }).length;
};

let input = fs.readFileSync('input/4.txt').toString().split("\n\n").map(function (data) {
    return data;
});

result = daySecond(input)
console.log('result: ' + result);