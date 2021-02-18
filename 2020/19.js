/**
 * Push large array into another array should use array = [...array, ...anotherArray] instead of array.push(...another)
 * 后者会报错“Maximum call stack size exceeded”, 其实真正的原因是“RangeError: too many function arguments”
 * https://anchortagdev.com/range-error-maximum-call-stack-size-exceeded-error-using-spread-operator-in-node-js-javascript/
 * 
 * First question I tried to get all possible for each rule and compare with inputs
 * Second question I used each input to check with rules
 */
const fs = require('fs');

const ruleCache = {};

const dayFirst = (rules, input) => {
    const posibleInput = generatePosibleInput(rules, rules[0], 0);

    return input.filter((data) => {
        return posibleInput.includes(data);
    }).length;
};

const generatePosibleInput = (rules, rule, index) => {
    let result = [];
    if (rule.includes('"a"') || rule.includes('"b"')) {
        return [rule.replace(/"/g, '')];
    }
    rule.split('|').map((data) => data.trim()).forEach((posible) => {
        let posibleSeparate = [];
        posible.split(' ').forEach((child) => {
            child = parseInt(child);
            if (ruleCache[child]) {
                childPosible = ruleCache[child];
            } else {
                childPosible = generatePosibleInput(rules, rules[child], child);
            }
            posibleSeparate.push(childPosible);
        });
        posibleResults = posibleSeparate.reduce((a, b) => {
            let array = [];
            a.forEach(param1 =>{
                b.forEach(param2 =>{
                    array.push(param1+param2);
                });
            });
            return array;
        });
        result = [...result, ...posibleResults];
    });
    ruleCache[index] = result;
    return result;
};

const daySecond = (rules, input) => {
    rules[8] = '42 | 42 8';
    rules[11] = '42 31 | 42 11 31';

    // consume(rules, '0', input[1]);
    return input.filter(i => consume(rules, '0', i).includes('')).length;
};

const consume = (rules, rule, input) => {
    // console.log(rule);
    let match;
	if (match = /^"(\w)"$/.exec(rule)) {
        // console.log(input[0] === match[1]);
		if (input[0] === match[1]) {
			return [input.slice(1)];
		} else {
			return [];
		}
	} else if (/^(\d+)$/.test(rule)) {
        // console.log(rules[rule]);
		return consume(rules, rules[rule], input);
	} else if (/\|/.test(rule)) {
		const subrules = rule.split(' | ');
		return subrules.map(subrule => consume(rules, subrule, input)).flat();
	} else {
		const subrules = rule.split(' ');
		let result = [input];
		for (let subrule of subrules) {
			result = result.map(x => consume(rules, subrule, x)).flat();
        }
        // console.log('result: ' + result);
		return result;
	}
}

const serializeInput = (document) => {
    let separate = document.split("\n\n");

    let rules = {};
    let rawRules = separate[0].split('\n');

    console.log(rawRules);
    console.log(rawRules.length);
    rawRules.forEach((data) => {
        // console.log(data);
        let ruleArray = data.split(':');
        let key = ruleArray[0].trim();
        let value = ruleArray[1].trim();
        rules[key] = value;
    });  

    // rules[100] = 'test';
    console.log(rules);
    let input = separate[1].split("\n");

    return [rules, input];
}

let document = fs.readFileSync('input/19.txt').toString();

let [rules, input] = serializeInput(document);

result = dayFirst(rules, input);
console.log('result: ' + result);