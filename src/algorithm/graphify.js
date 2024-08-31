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

    // For each neighbor, create an edge with weight
    for (const [neighbor, weight] of Object.entries(node.neighbors)) {
      if (!graph[neighbor]) {
        graph[neighbor] = {};
      }

      // Add the bidirectional edge (both ways)
      graph[node.locationID][neighbor] = weight;
      graph[neighbor][node.locationID] = weight;
    }
  });

  return graph; // Don't forget to return the graph
}

module.exports =  graphify;
