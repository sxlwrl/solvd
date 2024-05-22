'use strict';

class Node {
    /**
     * Initiate a node without the next element and with received value
     */
    constructor(value) {
        this.val = value;
        this.next = null;
    };
}

class LinkedList {
    /**
     * Initiate a linkedList without the head and tail, and first element and with size 0
     */
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    };

    /**
     * Method that pushes received value into the list
     * @param value
     * @returns list length
     */
    push(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
        return this.length;
    };

    /**
     * Method that pops last element from the list
     * @returns popped element
     */
    pop() {
        if (!this.length) {
            return null;
        }

        let currentNode = this.head;
        let newTail = currentNode;

        while (currentNode.next) {
            newTail = currentNode;
            currentNode = currentNode.next;
        }

        this.tail = newTail;
        this.tail.next = null;
        this.length--;

        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }

        return currentNode;
    };

    /**
     * Method that shifts first element from the list
     * @returns shifted element
     */
    shift() {
        if (!this.length) {
            return null;
        }

        let removedNode = this.head;

        this.head = this.head.next;
        this.length--;

        if (this.length === 0) {
            this.tail = null;
        }

        return removedNode;
    };

    /**
     * Method that pushes received value into the beginning of the list
     * @param value
     * @returns list length
     */
    unshift(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        }
        else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.length++;

        return this.length;
    };

    /**
     * Method that finds and returns element from the list by the received index
     * @param index
     * @returns found element
     */
    get(index) {
        if (index < 0 || index >= this.length) {
            return null;
        }

        let currentNode = this.head;
        let iterCounter = 0;

        while (iterCounter !== index) {
            currentNode = currentNode.next;
            iterCounter++;
        }

        return currentNode;
    };

    /**
     * Method that inserts element into the list
     * @param value
     * @param index
     * @returns list length
     */
    insert(value, index) {
        const newNode = new Node(value);

        if (index < 0 || index > this.length) {
            return false;
        }

        if (index === this.length) {
            return this.push(newNode);
        }

        if (index === 0) {
            return this.unshift(newNode);
        }

        const prev = this.get(index - 1);
        let temp = prev.next;

        prev.next = newNode;
        newNode.next = temp;

        return this.length++;
    };

    /**
     * Method that removes element from the list by the received index
     * @param index
     * @returns removed element
     */
    remove(index) {
        if (index < 0 || index > this.length) {
            return undefined;
        }

        if (index === this.length - 1) {
            return this.pop();
        }

        if (index === 0) {
            return this.shift();
        }

        const prev = this.get(index - 1);
        let removedNode = prev.next;

        prev.next = removedNode.next;

        this.length--;

        return removedNode;
    };

    /**
     * Method that checks if the list is cycled
     * @returns {boolean}
     */
    isCycled() {
        if (!this.head || !this.head.next) {
            return false;
        }

        let slow = this.head;
        let fast = this.head.next;

        while (fast !== null && fast.next !== null) {
            if (slow === fast) {
                return true;
            }
            slow = slow.next;
            fast = fast.next.next;
        }

        return false;
    };
}

const list = new LinkedList();

list.push(10);
list.push(20);
list.pop();

list.unshift(30);
list.unshift(40);
list.shift();

list.insert(1, 0);
list.insert(2, 1);
list.insert(3, 2);
list.insert(4, 3);

list.remove(1);

console.log(list.get(3));

console.log(list.isCycled());

// console.log(list);