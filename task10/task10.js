'use strict';

class HashTable {
    /**
     * Initiate a Hash Table with default size = 17
     *
     * @param size - Hash Table Size
     */
    constructor(size = 17) {
        this.keyMap = new Array(size);
    };

    /**
     * Method that hashes a key and returns hash
     *
     * @param key - key
     */
    hash(key) {
        let totalHash = 0;

        for (let i = 0; i < Math.min(key.length, 100); i++) {
            const char = key[i];
            const value = char.charCodeAt(0) - 96;
            totalHash = (totalHash + value) % this.keyMap.length;
        }

        return totalHash;
    };

    /**
     * Method that adds key-value pair to Hash Table
     *
     * Avg time complexity: O(1)
     * Worst time complexity: O(n)
     *
     * @param key - key
     * @param value - value
     */
    set(key, value) {
        const index = this.hash(key);
        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }
        this.keyMap[index].push([key, value]);
    };

    /**
     * Method that receives key-value pair to Hash Table
     *
     * Avg time complexity: O(1)
     * Worst time complexity: O(n)
     *
     * @param key - key
     */
    get(key) {
        const index = this.hash(key);
        if (this.keyMap[index]) {
            for (let [storedKey, storedValue] of this.keyMap[index]) {
                if (storedKey === key) {
                    return storedValue;
                }
            }
        }

        return null;
    };

    /**
     * Method that removes key-value pair to Hash Table
     *
     * Avg time complexity: O(1)
     * Worst time complexity: O(n)
     *
     * @param key - key
     */

    delete(key) {
        const index = this.hash(key);
        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    this.keyMap[index].splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    };

    /**
     * Method that iterates through values
     *
     * Avg time complexity: O(n * m)
     * Worst time complexity: O(n * m)
     */
    values() {
        const valuesSet = new Set();

        for (let bucket of this.keyMap) {
            if (bucket) {
                for (let [key, value] of bucket) {
                    valuesSet.add(value);
                }
            }
        }

        return Array.from(valuesSet);
    };

    /**
     * Method that iterates through keys
     *
     * Avg time complexity: O(n * m)
     * Worst time complexity: O(n * m)
     */
    keys() {
        const keysSet = new Set();

        for (let bucket of this.keyMap) {
            if (bucket) {
                for (let [key] of bucket) {
                    keysSet.add(key);
                }
            }
        }

        return Array.from(keysSet);
    }
}

const ht = new HashTable(10);

ht.set('a', '1');
ht.set('a', '2');
ht.set('a', '3');
ht.set('a', '4');
ht.set('b', '1');

console.log(ht.get('a'));
console.log(ht.get('c'));
console.log(ht.delete('a'));
console.log(ht.delete('a'));
console.log(ht.delete('с'));
console.log(ht.get('a'));

console.log(ht.values());
console.log(ht.keys());

console.log(ht);