const express = require('express');
const router = express.Router();
const { Location } = require('./sequelize');  // Ensure this path is correct

router.use(express.json());

router.get('/locations', async (req, res, next) => {
  try {
    const locations = await Location.findAll();
    res.status(200).json(locations);
  } catch (err) {
    next(err); // Forward error to Express error handler
  }
});

router.post('/locations', async (req, res, next) => {
  try {
    const { name, neighbors } = req.body;
    if (!name || !neighbors) {
      return res.status(400).json({ error: 'Name and neighbors are required' });
    }
    const location = await Location.create({
      locationName: name,  // Adjust the property name if needed
      neighbors
    });
    res.status(201).json(location);
  } catch (err) {
    next(err); // Forward error to Express error handler
  }
});

module.exports = router;
