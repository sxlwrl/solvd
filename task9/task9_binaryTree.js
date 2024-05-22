'use strict';

class Node {
    /**
     * Initiate a node without the left and right element and with received value
     */
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    };
}

class BinarySearchTree {
    /**
     * Initiate a binaryTree without root element
     */
    constructor() {
        this.root = null;
    };

    /**
     * Method that adds a node to a binary tree
     * @param value
     */
    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let currentRoot = this.root;

        while (true) {
            if (value === currentRoot.value) return null;

            if (value < currentRoot.value) {
                if (currentRoot.left === null) {
                    currentRoot.left = newNode;
                    return;
                }
                currentRoot = currentRoot.left;
            } else {
                if (currentRoot.right === null) {
                    currentRoot.right = newNode;
                    return;
                }
                currentRoot = currentRoot.right;
            }
        }
    };

    /**
     * Method that finds a specific node in a binary tree
     * @param value
     */
    find(value) {
        if (this.root === null) {
            return null;
        }

        let currentNode = this.root;
        let found = false;

        while (currentNode && !found) {
            if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else if (value > currentNode.value) {
                currentNode = currentNode.right;
            } else {
                return currentNode;
            }
        }

        if (!found) return null;
    };

    /**
     * Method that traverses tree in pre-order
     */
    PreOrder() {
        const nodes = [];

        function traverse(node) {
            nodes.push(node.value);

            node.left && traverse(node.left);
            node.right && traverse(node.right);
        }

        traverse(this.root);
        return nodes;
    };

    /**
     * Method that traverses tree in post-order
     */
    PostOrder() {
        const nodes = [];

        function traverse(node) {
            node.left && traverse(node.left);
            node.right && traverse(node.right);

            nodes.push(node.value);
        }

        traverse(this.root);

        return nodes;
    };

    /**
     * Method that traverses tree in in-order
     */
    InOrder() {
        const nodes = [];

        function traverse(node) {
            node.left && traverse(node.left);
            nodes.push(node.value);
            node.right && traverse(node.right);
        }

        traverse(this.root);

        return nodes;
    };

    /**
     * Method that checks if tree is binary (left element less than parent, right element is great than parent)
     */
    isBST() {
        function validate(node, min = null, max = null) {
            if (node === null) return true;

            if ((min !== null && node.value <= min) ||
                (max !== null && node.value >= max)) {
                return false;
            }

            return validate(node.left, min, node.value) && validate(node.right, node.value, max);
        }

        return validate(this.root);
    };
}

const tree = new BinarySearchTree();

//            10
//      5           20
//  2       8   15      30

tree.insert(10);
tree.insert(5);
tree.insert(20);
tree.insert(2);
tree.insert(30);
tree.insert(15);
tree.insert(8);

console.log(tree.find(15));

console.log(tree.PreOrder());
console.log(tree.PostOrder());
console.log(tree.InOrder());

console.log(tree.isBST());

console.log(tree);