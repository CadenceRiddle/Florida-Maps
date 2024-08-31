const request = require('supertest');
const express = require('express');
const { createAlgorithmRouter } = require('../src/algorithm/route');
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
app.use('/api', createAlgorithmRouter({ Location }));

describe('test the capabilities of the shortest path algorithm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find the shortest path', async () => {
    const mockLocations = [
      { locationID: 1, locationName: 'Location 1', neighbors: {"Location 2": 1, "Location 3": 10} },
      { locationID: 2, locationName: 'Location 2', neighbors: {"Location 1": 1, "Location 7": 2, "Location 3": 1} },
      { locationID: 3, locationName: 'Location 3', neighbors: {"Location 1": 10, "Location 2": 2, "Location 7": 3, "Location 6": 1} },
      { locationID: 4, locationName: 'Location 4', neighbors: {"Location 10": 2} },
      { locationID: 5, locationName: 'Location 5', neighbors: {"Location 10": 5, "Location 6": 3} },
      { locationID: 6, locationName: 'Location 6', neighbors: {"Location 3": 1, "Location 9": 4, "Location 5": 3} },
      { locationID: 7, locationName: 'Location 7', neighbors: {"Location 2": 2, "Location 3": 3} },
      { locationID: 8, locationName: 'Location 8', neighbors: {"Location 3": 7, "Location 9": 6} },
      { locationID: 9, locationName: 'Location 9', neighbors: {"Location 6": 4, "Location 8": 6} },
      { locationID: 10, locationName: 'Location 10', neighbors: {"Location 4": 2, "Location 5": 5} },
    ];
    
    Location.findAll.mockResolvedValue(mockLocations);

    const response = await request(app).post("/api/findPath").send({
      locationA: "Location 1",
      locationB: "Location 6"
    });

    console.log("Response:", response.body);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('path');
    expect(Location.findAll).toHaveBeenCalledTimes(1);
  });
});
