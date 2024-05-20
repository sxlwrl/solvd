class Node {
    /**
     * Initiate a node without the previous element and with received value
     */
    constructor(value) {
        this.value = value;
        this.prev = null;
    };
}

class Stack {
    /**
     * Initiate a stack without the last element and with size 0
     */
    constructor() {
        this.last = null;
        this.size = 0;
        this.min = null;
        this.max = null;
    };

    /**
     * Method that pushes received value into the stack
     * @param value
     * @returns stack size
     */
    push(value) {
        const newItem = new Node(value);
        newItem.prev = this.last;
        this.last = newItem;

        if (this.min === null || value < this.min.value) {
            this.min = newItem;
        }

        if (this.max === null || value > this.max.value) {
            this.max = newItem;
        }

        return this.size++;
    };

    /**
     * Method that removed top element from the stack
     * @returns removed item
     */
    pop() {
        if (!this.size) {
            return null;
        }

        const removedItem = this.last;
        this.last = this.last.prev;
        this.size--;
        return removedItem;
    };

    /**
     * Method that peeks top element of the stack
     * @returns peeked item
     */
    peek() {
        if (!this.size) {
            return null;
        }

        return this.last;
    };

    /**
     * Method that returns min element in the stack
     * @returns peeked item
     */
    getMin() {
        if (!this.size) {
            return null;
        }

        return this.min;
    };

    /**
     * Method that returns max element in the stack
     * @returns peeked item
     */
    getMax() {
        if (!this.size) {
            return null;
        }

        return this.max;
    };
}

const stack = new Stack();
stack.push(10);
stack.push(5);
stack.push(20);
stack.push(85);

// console.log(stack.pop());
// console.log(stack.peek());
console.log(stack.getMax());
console.log(stack.getMin());


console.log(stack);