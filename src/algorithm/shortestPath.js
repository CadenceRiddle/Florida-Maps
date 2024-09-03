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
            console.log("End Node reached:", endNode);
            let path = [];
            let current = endNode;
            while (current !== null) {
                path.unshift(current);  // Add the current node to the beginning of the path
                console.log("Path step:", current);
                current = paths[current];  // Move to the predecessor node
            }
            console.log("Final path:", path);
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

        console.log("Current Node:", currentNode);
        console.log("Neighbors:", graph[currentNode]);
        console.log("Distances:", distances);
        console.log("Paths:", paths);
    }

    // Return an empty array if no path is found
    return [];
    
};

module.exports = dijkstra;