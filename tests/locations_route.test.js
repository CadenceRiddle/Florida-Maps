const request = require('supertest');
const express = require('express');
const { createLocationsRouter } = require('../src/locations_route');
const { Location } = require('../src/sequelize');

jest.mock('../src/sequelize', () => ({
  Location: {
    findAll: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    destroy: jest.fn(),
  }
}));

const app = express();
app.use(express.json());
app.use('/api', createLocationsRouter({ Location }));

describe('test the endpoints of the locations route', () => {

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock data after each test
  });

  describe('test the GET /locations endpoint', () => {
    it('should return 200 and list of locations', async () => {
      const mockLocations = [
        { locationID: 1, locationName: 'Location 1', neighbors: ['Neighbor 1', 'Neighbor 2'] },
        { locationID: 2, locationName: 'Location 2', neighbors: ['Neighbor 3', 'Neighbor 4'] },
      ];
      Location.findAll.mockResolvedValue(mockLocations);

      const response = await request(app).get("/api/locations");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockLocations);
      expect(Location.findAll).toHaveBeenCalledTimes(1);
    });
  });

  // Similarly, you can add more tests for POST, PUT, DELETE endpoints.

  describe('test the POST /locations endpoint', () => {
    it('should create a new location and return 201', async () => {
      const mockLocation = { locationID: 1, locationName: 'New Location', neighbors: ['Neighbor 1'] };
      Location.create.mockResolvedValue(mockLocation);

      const response = await request(app).post("/api/locations").send({
        name: 'New Location',
        neighbors: ['Neighbor 1']
      });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(mockLocation);
      expect(Location.create).toHaveBeenCalledTimes(1);
    });

    it('should return 400 if name or neighbors are missing', async () => {
      const response = await request(app).post("/api/locations").send({
        name: 'New Location'
      });

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'Name and neighbors are required' });
      expect(Location.create).not.toHaveBeenCalled();
    });
  });

  it('should update an existing location and return 200', async () => {
  const mockLocation = { locationID: 1, locationName: 'Updated Location', neighbors: ['Neighbor 1'] };
  Location.findByPk.mockResolvedValue(mockLocation);
  mockLocation.update = jest.fn().mockResolvedValue(mockLocation);

  const response = await request(app).put("/api/locations/1").send({
    locationName: 'Updated Location'
  });

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({
    message: 'Location updated successfully',
    location: {
      locationID: 1,
      locationName: 'Updated Location',
      neighbors: ['Neighbor 1']
    }
  });
  expect(Location.findByPk).toHaveBeenCalledTimes(1);
  expect(mockLocation.update).toHaveBeenCalledWith({
    locationName: 'Updated Location',
  });
});


  describe('test the DELETE /locations/locationName/:locationName endpoint', () => {
    it('should delete an existing location and return 200', async () => {
      const mockLocation = { locationID: 1, locationName: 'Location to delete' };
      Location.findOne.mockResolvedValue(mockLocation);
      mockLocation.destroy = jest.fn().mockResolvedValue();

      const response = await request(app).delete("/api/locations/locationName/Location to delete");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: 'Location deleted' });
      expect(Location.findOne).toHaveBeenCalledTimes(1);
      expect(mockLocation.destroy).toHaveBeenCalledTimes(1);
    });

    it('should return 400 if location not found', async () => {
      Location.findOne.mockResolvedValue(null);

      const response = await request(app).delete("/api/locations/locationName/Location to delete");

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ message: 'Location not found' });
      expect(Location.findOne).toHaveBeenCalledTimes(1);
    });
  });

});
