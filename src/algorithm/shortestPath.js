const { PriorityQueue } = require('./priorityQueue')

function dijkstra(graph, startNode, endNode) {
    // Initialize distances, paths, and a priority queue
    let distances = {};
    let paths = {};
    let pq = new PriorityQueue();

    // Initialize all distances to infinity and paths to null
    for (let node in graph) {
        distances[node] = Infinity;
        paths[node] = null;
    }
    distances[startNode] = 0;

    // Add the start node to the priority queue with a distance of 0
    pq.enqueue(startNode, 0);

    while (!pq.isEmpty()) {
        // Get the node with the smallest distance
        let currentNode = pq.dequeue().element;

        // If we reach the endNode, reconstruct the path
        if (currentNode === endNode) {
            let path = [];
            let current = endNode;
            while (current !== null) {
                path.unshift(current);
                current = paths[current];
            }
            return path;
        }

        // Explore neighbors
        for (let neighbor in graph[currentNode]) {
            let newDistance = distances[currentNode] + graph[currentNode][neighbor];

            // If a shorter path to the neighbor is found
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                paths[neighbor] = currentNode;
                pq.enqueue(neighbor, newDistance);
            }
        }
    }

    // Return an empty array if no path is found
    return [];
};

module.exports = { dijkstra };