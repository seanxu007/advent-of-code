/**
 * array.map(Number) is same as array.map((data) => parseInt(data))
 * 
 */
const fs = require('fs');


const dayFirst = (rules, selfTicket, neighTickets) => {
    let result = 0;
    const tickets = [selfTicket, ...neighTickets];
    const ruleValues = Object.values(rules).flat();
    // console.log(tickets);
    tickets.forEach((ticket) => {
        ticket.forEach((item) => {
            match = ruleValues.some((rule) => {
                return item >= rule[0] && item <= rule[1];
            });
            if (!match) {
                result += item;
            }
        });
    });
    return result;
};

const daySecond = (rules, selfTicket, neighTickets) => {
    const tickets = [selfTicket, ...neighTickets];
    validTickets = getValidTickets(tickets, rules);
    const possibleRules = selfTicketPosibleRules(validTickets, selfTicket, rules);
    console.log(possibleRules);
    selfTicketWithRule = {};
    while (Object.keys(selfTicketWithRule).length !== selfTicket.length) {
        for (const [key, value] of Object.entries(possibleRules)) {
            rightRuleArray = value.filter((data) => {
                return !Object.keys(selfTicketWithRule).includes(data);
            });
            if (rightRuleArray.length === 1) {
                selfTicketWithRule[rightRuleArray[0]] = parseInt(key);
            }
        }
    }
    
    console.log(selfTicketWithRule);
    validateRuleNames = Object.keys(rules).filter((item) => {
        return item.includes('departure');
    })
    return validateRuleNames.reduce((a, b) => {
        return a * selfTicketWithRule[b];
    }, 1);
};

const getValidTickets = (tickets, rules) => {
    const ruleValues = Object.values(rules).flat();
    return tickets.filter((ticket) => {
        return !ticket.some((item) => {
            return !ruleValues.some((rule) => {
                return item >= rule[0] && item <= rule[1];
            });
        });
    });
};

const selfTicketPosibleRules = (tickets, selfTicket, rules) => {
    result = {};
    for (let i=0; i<selfTicket.length; i++) {
        let key = selfTicket[i];
        // console.log(key);
        let value = [];
        // console.log('self: ' + key);
        for (let [ruleName, rule] of Object.entries(rules)) {
            let allPassed = true;
            for (let j=0; j<tickets.length; j++) {
                let checkNumber = tickets[j][i];
                match = rule.some((item) => {
                    return checkNumber >= item[0] && checkNumber <= item[1];
                });
                // console.log(tickets[j][i] + '----' + match);
                if (!match) {
                    allPassed = false;
                }
            }
            // console.log(ruleName);
            // console.log(allPassed);
            if (allPassed) {
                value.push(ruleName);
            }
        }
        result[key] = value;
    }
    return result;
};


const serializeInput = (input) => {
    const rules = {};
    
    input[0].split('\n').forEach(function (data) {
        tmp = data.split(':');
        key = tmp[0].trim();
        value = tmp[1].trim().split('or').map(function (data) {
            const separate = data.trim().split('-').map((item) => parseInt(item));
            return [separate[0], separate[1]];
        });
        rules[key] = value;
    });
    
    const selfTicket = input[1].split('\n')[1].split(',').map(Number);

    const neighTickets = input[2].split('\n').slice(1).map(function (data) {
        return data.split(',').map(Number);
    });
    
    return [rules, selfTicket, neighTickets];
};

let input = fs.readFileSync('input/16.txt').toString().split("\n\n").map(function (data) {
    return data;
});
const [rules, selfTicket, neighTickets] = serializeInput(input);

result = daySecond(rules, selfTicket, neighTickets);
console.log('result: ' + result);