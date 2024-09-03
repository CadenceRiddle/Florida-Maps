const graphify = async (database) => {
  // Step 1: Fetch all locations
  const nodes = await database.findAll();

  // Step 2: Initialize the graph as an adjacency list
  const graph = {};

  // Step 3: Populate the graph
  nodes.forEach(node => {
    // Initialize the node if not already present
    if (!graph[node.locationID]) {
      graph[node.locationID] = {};
    }

    // For each neighbor, create an edge with weight using locationID as key
    for (const [neighborName, weight] of Object.entries(node.neighbors)) {
      const neighbor = nodes.find(n => n.locationName === neighborName);
      if (neighbor) {
        if (!graph[neighbor.locationID]) {
          graph[neighbor.locationID] = {};
        }

        // Add the bidirectional edge (both ways)
        graph[node.locationID][neighbor.locationID] = weight;
        graph[neighbor.locationID][node.locationID] = weight;
      }
    }
  });

  return graph; // Return the graph
}


module.exports =  graphify;
