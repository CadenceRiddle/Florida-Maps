const express = require('express');
const router = express.Router();
const { Location } = require('./sequelize');  // Ensure this path is correct

router.use(express.json());

router.get('/locations', async (req, res, next) => {
  try {
    const locations = await Location.findAll();
    res.status(200).json(locations);
  } catch (err) {
    res.status(404).json({error: err.message}); // Forward error to Express error handler
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

router.put('/locations/:locationId', async (req, res, next) => {
  try {
    const id = req.params.locationId; // Extract the location ID from the URL
    const { locationName, otherField1, otherField2 } = req.body; // Destructure the fields you want to update from the request body

    // Find the location by its ID
    const target = await Location.findByPk(id);

    if (target) {
      // Update the location with the new data
      await target.update({
        locationName: locationName || target.locationName, // Update if provided, otherwise keep current value
        otherField1: otherField1 || target.otherField1,   // Add more fields as needed
        otherField2: otherField2 || target.otherField2
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
  try{
    const name = req.params.locationName;
    const target = await Location.findOne({
      where: {
        locationName: name
      }
    });
    if(target){
      await target.destroy();
      res.status(200).json({message: 'location deleted'});
    }
    else{
      res.status(400).json({message: 'location not found'});
    }
  }
  catch(err){
    res.status(400).json({error: err.message});
  }
});

module.exports = router;
