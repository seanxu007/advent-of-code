/**
 * Map get key is much faster
 */
const fs = require('fs');


class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class List {
    constructor(input) {
        this.head = null;
        this.length = 0;

        this.map = new Map();
        let firstNode = null;
        input.reverse().forEach((item, index) => {
            let node = List.createNode(item);
            this.insert(node);
            if (index === 0) {
                firstNode = node;
            }
        });
        firstNode.next = this.head;
    }

    static createNode(value) {
        return new Node(value);
    }

    insert(node) {
        if (this.head) {
            node.next = this.head;
        } else {
            node.next = null;
        }
        this.head = node;
        this.length++;
        this.map.set(node.value, node);
    }

    // need to optimise this
    find(value) {
        return this.map.get(value);
    }

    move() {
        const first = this.head.next;
        const second = first.next;
        const third = second.next;

        this.head.next = third.next;

        let destination = this.head.value - 1;

        while ([first.value, second.value, third.value, this.head.value].includes(destination) || destination < 1) {
            if (destination < 1) {
                destination = this.length;
            } else {
                destination--;
            }
        }
        const destinationNode = this.find(destination);
        third.next = destinationNode.next;
        destinationNode.next = first;
        this.head = this.head.next;
    }

    toArray() {
        let result = [];
        let node = this.head;
        while (result.length !== this.length) {
            result.push(node.value);
            node = node.next;
        }
        return result;
    }
}

const dayFirst = (input) => {
    const list = new List(input);
    
    for (let i=0; i<10; i++) {
        list.move();
    }
    return list.toArray();
};


const daySecond = (input) => {
    for (let i = Math.max(...input) + 1; i <= 1000000; i++) {
        input.push(i);
    }
    const list = new List(input);
    
    for (let i=0; i<10000000; i++) {
        if (i % 1000 === 0) {
            console.log(i + ' moves');
        }
        list.move();
    }

    node = list.find(1);
    
    return node.next.value * node.next.next.value;
};

let input = fs.readFileSync('input/23.txt').toString().split("").map(Number);

result = daySecond(input);
console.log('result: ' + result);