/**
 * Object的排序：let sortPosibles = Object.fromEntries([...Object.entries(posibles)].sort((a, b) => a[1] - b[1]));
 * 
 * Regex match是取所有符合regex的字段放进一个array
 * Regex exec可以capture定义的regex里的group并放进一个array
 */
const fs = require('fs');

const mapAllergenWithIngredient = (input) => {
    const posibles = {};
    input.sort((a, b) => a['allergens'].length - b['allergens'].length);
    for (let i=0; i<input.length; i++) {
        let allergenArray = input[i]['allergens'].filter(data => !posibles[data]);
        if (allergenArray.length === 0) {
            continue;
        }
        // sort by length of allergens, should have 1 allergen each time
        let allergen = allergenArray[0];
        let ingredients = input[i]['ingredients'];

        for (let j=0; j<input.length; j++) {
            if (i===j) {
                continue;
            }
            if (input[j]['allergens'].includes(allergen)) {
                ingredients = ingredients.filter(v => input[j]['ingredients'].includes(v));
            }
        }
        posibles[allergen] = ingredients;
    }
    const pairs = getPairs(posibles);
    return pairs;
}

const getPairs = (posibles) => {
    const pairs = {};
    let sortPosibles = Object.fromEntries([...Object.entries(posibles)].sort((a, b) => a[1].length - b[1].length));
    while (Object.keys(pairs).length !== Object.values(posibles).length) {
        for (let [key, value] of Object.entries(sortPosibles)) {
            if (Object.keys(pairs).includes(key)) {
                continue;
            }
            let ingredientArray = value.filter(data => !Object.values(pairs).includes(data));
            if (ingredientArray.length === 1) {
                pairs[key] = ingredientArray[0];
            }
        }
    }
    return pairs;
}

const dayFirst = (input, pairs) => {
    let dangerousIngredients = Object.values(pairs);
    console.log(dangerousIngredients);
    let count = 0;
    input.forEach(data => {
        data['ingredients'].forEach(item => {
            if (!dangerousIngredients.includes(item)) {
                count++;
            }
        });
    });

    return count;
};

const daySecond = (input, pairs) => {
    result = Object.fromEntries(Object.entries(pairs).sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    }));
    return Object.values(result).join(',');
};


let input = fs.readFileSync('input/21.txt').toString().split("\n").map((data) => {
    obj = {};
    match = /^([\w| ]+) \(contains ([\w| |,]+)\)$/g.exec(data);
    ingredients = match[1].split(' ');
    allergens = match[2].split(',').map(item => item.trim());
    obj['ingredients'] = ingredients;
    obj['allergens'] = allergens;
    return obj;
});

const pairs = mapAllergenWithIngredient(input);

result = daySecond(input, pairs);
console.log('result: ' + result);