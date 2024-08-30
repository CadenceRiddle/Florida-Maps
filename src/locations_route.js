// locations_route.js
const express = require('express');

const createLocationsRouter = ({ Location }) => {
  const router = express.Router();

  router.use(express.json());

  router.get('/locations', async (req, res, next) => {
    try {
      const locations = await Location.findAll();
      res.status(200).json(locations);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });

  router.post('/locations', async (req, res, next) => {
    try {
      const { name, neighbors } = req.body;
      if (!name || !neighbors) {
        return res.status(400).json({ error: 'Name and neighbors are required' });
      }
      const location = await Location.create({
        locationName: name,
        neighbors,
      });
      res.status(201).json(location);
    } catch (err) {
      next(err);
    }
  });

  router.put('/locations/:locationId', async (req, res, next) => {
    try {
      const id = req.params.locationId;
      const { locationName, otherField1, otherField2 } = req.body;

      const target = await Location.findByPk(id);

      if (target) {
        await target.update({
          locationName: locationName || target.locationName,
          otherField1: otherField1 || target.otherField1,
          otherField2: otherField2 || target.otherField2,
        });

        res.status(200).json({ message: 'Location updated successfully', location: target });
      } else {
        res.status(404).json({ message: 'Location not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete('/locations/locationName/:locationName', async (req, res, next) => {
    try {
      const name = req.params.locationName;
      const target = await Location.findOne({
        where: {
          locationName: name,
        },
      });
      if (target) {
        await target.destroy();
        res.status(200).json({ message: 'Location deleted' });
      } else {
        res.status(400).json({ message: 'Location not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  return router;
};

module.exports = {
  createLocationsRouter,
};
