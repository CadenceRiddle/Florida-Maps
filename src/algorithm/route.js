const express = require('express');
const dijkstra = require('./shortestPath');
const graphify = require('./graphify');

const createAlgorithmRouter = (database) =>{
  const router = express.Router();
  router.use(express.json());

  router.post('/findPath', async (req, res, next)=>{
    const { locationA, locationB } = req.body;
    if (!locationA || !locationB) {
        return res.status(400).json({ error: 'both locations are required' });
    };
    try{
      const targetA = await database.findOne({
        locationName: locationA
      });
      const targetB = await database.findOne({
        locationName: locationB
      });

      const graph = graphify(database);
      const result = dijkstra(graph, targetA, targetB);

      res.status(200).json({ path: result });
    }
    catch(err){
      res.status(400).json({ error: err.message });
    }
  })

  return router;
}

module.exports = { createAlgorithmRouter };