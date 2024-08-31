const express = require('express');
const dijkstra = require('./shortestPath')

const createAlgorithmRouter = (database) =>{
  const router = express.Router();
  router.use(express.json());

  router.post('/findPath', async (req, res, next)=>{
    const { locationA, locationB } = req.body;
    if (!locationA || !locationB) {
        return res.status(400).json({ error: 'both locations are required' });
    };

    const targetA = await database.findOne({
      locationName: locationA
    });
    const targetB = await database.findOne({
      locationName: locationB
    });
  })

  return router;
}

module.exports = { createAlgorithmRouter };