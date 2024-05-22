'use strict';

/**
 * Initiate a priority queue for Dijkstra algorithm
 */
class Queue {
    /**
     * Initiate a queue with empty array
     */
    constructor() {
        this.values = [];
    };

    /**
     * Method that adds received value into the queue
     * @param item
     */
    enqueue(item) {
        this.values.push(item);
        this.sortByPriority();
    };

    /**
     * Method that removes the first element from the queue
     */
    dequeue() {
        return this.values.shift();
    };

    /**
     * Method that checks if queue is empty
     */
    isEmpty() {
        return this.values.length === 0;
    };

    /**
     * Method that sorts queue by priority
     */
    sortByPriority() {
        this.values.sort((a, b) => a.priority - b.priority);
    };
}

class Graph {
    /**
     * Initiate a graph with adjacency object
     */
    constructor() {
        this.adjacencies = {};
    };

    /**
     * Method that adds a vertex
     * @param vertex
     */
    addVertex(vertex) {
        if (!this.adjacencies[vertex]) {
            this.adjacencies[vertex] = [];
        }
    };

    /**
     * Method that adds an edge (creates a connection between two vertices)
     * @param vertex1
     * @param vertex2
     */
    addEdge(vertex1, vertex2) {
        if (vertex1 in this.adjacencies && vertex2 in this.adjacencies) {
            this.adjacencies[vertex1].push(vertex2);
            this.adjacencies[vertex2].push(vertex1);
        }
    };

    /**
     * Method that removes an edge (destroys a connection between two vertices)
     * @param vertex1
     * @param vertex2
     */
    removeEdge(vertex1, vertex2) {
        if (vertex1 in this.adjacencies && vertex2 in this.adjacencies) {
            this.adjacencies[vertex1] = this.adjacencies[vertex1].filter(v => v !== vertex2);
            this.adjacencies[vertex2] = this.adjacencies[vertex2].filter(v => v !== vertex1);
        }
    };

    /**
     * Method that perform Depth-first Search (DFS)
     * @param start
     */
    DFS(start) {
        const stack = [start];
        const result = [];
        const visited = {[start]: true};

        let currentVertex = null;

        while (stack.length) {
            currentVertex = stack.pop();
            result.push(currentVertex);

            this.adjacencies[currentVertex].forEach(nV => {
                if (!visited[nV]) {
                    visited[nV] = true;
                    stack.push(nV);
                }
            });
        }

        return result;
    };

    /**
     * Method that perform Breadth-first Search (BFS)
     * @param start
     */
    BFS(start) {
        const queue = [start];
        const result = [];
        const visited = {[start]: true};

        let currentVertex = null;

        while (queue.length) {
            currentVertex = queue.shift();
            result.push(currentVertex);

            this.adjacencies[currentVertex].forEach(nV => {
                if (!visited[nV]) {
                    visited[nV] = true;
                    queue.push(nV);
                }
            });
        }

        return result;
    };

    /**
     * Method that performs Dijkstra algorithm to find the shortest path between two vertices
     * @param start
     * @param end
     */
    Dijkstra(start, end) {
        const distances = {};
        const previous = {};
        const queue = new Queue();
        const path = [];

        Object.keys(this.adjacencies).forEach(vertex => {
            distances[vertex] = Infinity;
            previous[vertex] = null;
        });

        distances[start] = 0;
        queue.enqueue(start);

        while (!queue.isEmpty()) {
            const currentVertex = queue.dequeue();

            if (currentVertex === end) {
                let temp = currentVertex;
                while (temp) {
                    path.unshift(temp);
                    temp = previous[temp];
                }
                break;
            }

            this.adjacencies[currentVertex].forEach(nV => {
                const candidate = distances[currentVertex] + 1;
                if (candidate < distances[nV]) {
                    distances[nV] = candidate;
                    previous[nV] = currentVertex;
                    queue.enqueue(nV);
                }
            });
        }

        return path.length ? path.join(' -> ') : null;
    };

    /**
     * Method that performs BFS algorithm to find the shortest path between two vertices
     * @param start
     * @param end
     */
    BFSPath(start, end) {
        const queue = [start];
        const visited = {[start]: true};

        while (queue.length) {
            const path = queue.shift();
            const vertex = path[path.length - 1];

            if (vertex === end) {
                return path.join(' -> ');
            }

            this.adjacencies[vertex].forEach(nV => {
                if (!visited[nV]) {
                    visited[nV] = true;
                    const newPath = [...path, nV];
                    queue.push(newPath);
                }
            });
        }

        return null;
    };
}

const graph = new Graph();

//      2 - 4
//    /
//  1   |   |
//    \
//      3 - 5

graph.addVertex('1');
graph.addVertex('2');
graph.addVertex('3');
graph.addVertex('4');
graph.addVertex('5');

graph.addEdge('1', '2');
graph.addEdge('1', '3');
graph.addEdge('2', '3');
graph.addEdge('2', '4');
graph.addEdge('3', '5');
graph.addEdge('4', '5');

// graph.removeEdge(1, 2);

console.log(graph.adjacencies);

console.log(graph.DFS('1'));
console.log(graph.BFS('1'));

console.log(graph.Dijkstra('1', '4'));
console.log(graph.BFSPath('1', '4'));
