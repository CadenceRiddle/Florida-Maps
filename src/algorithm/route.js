const express = require('express');
const dijkstra = require('./shortestPath');
const graphify = require('./graphify');

const createAlgorithmRouter = ({ Location }) => {
  const router = express.Router();
  router.use(express.json());

  router.post('/findPath', async (req, res, next) => {
    const { locationA, locationB } = req.body;
    if (!locationA || !locationB) {
        return res.status(400).json({ error: 'Both locations are required' });
    }

    try {
      const targetA = await Location.findOne({
        where: { locationName: locationA }
      });
      const targetB = await Location.findOne({
        where: { locationName: locationB }
      });

      console.log("Target A:", targetA);
      console.log("Target B:", targetB);

      // Check if both locations were found
      if (!targetA || !targetB) {
        return res.status(404).json({ error: 'One or both locations not found' });
      }

      const graph = await graphify(Location);

      console.log("Graph created:", graph);

      if (!graph[targetA.locationID] || !graph[targetB.locationID]) {
        return res.status(404).json({ error: 'Start or end location not in graph' });
      }

      const result = dijkstra(graph, targetA.locationID, targetB.locationID);

      res.status(200).json({ path: result });
    } catch (err) {
      console.error("Error occurred:", err.message);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  });

  return router;
}

module.exports = { createAlgorithmRouter };
