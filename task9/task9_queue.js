'use strict';

class Item {
    /**
     * Initiate a node without the next element and with received value
     */
    constructor(value) {
        this.value = value;
        this.next = null;
    };
}

class Queue {
    /**
     * Initiate a queue without the last and first element and with size 0
     */
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    };

    /**
     * Method that adds received value into the queue
     * @param value
     * @returns stack size
     */
    enqueue(value) {
        const newItem = new Item(value);

        if (!this.size) {
            this.first = newItem;
            this.last = this.first;
        }
        else {
            this.last.next = newItem;
            this.last = newItem;
        }

        return ++this.size;
    };

    /**
     * Method that removes the first element from the queue
     * @returns removed element
     */
    dequeue() {
        if (!this.first) {
            return null;
        }

        let removedElement = this.first;

        if (this.first === this.last) {
            this.last = null;
        }

        this.first = this.first.next;
        --this.size;

        return removedElement;
    };

    /**
     * Method that peeks the first element from the queue
     * @returns peeked element
     */
    peek() {
        if (!this.first) {
            return null;
        }

        return this.first;
    };
}

const queue = new Queue();

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.enqueue(40);
queue.enqueue(50);

queue.dequeue();
queue.dequeue();
// queue.dequeue();

console.log(queue.peek());

console.log(queue);