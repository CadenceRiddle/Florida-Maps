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
      { locationID: 1, locationName: 'Location 1', neighbors: {"2": 1, "3": 10} },
      { locationID: 2, locationName: 'Location 2', neighbors: {"1": 1, "7": 2, "3": 1} },
      { locationID: 3, locationName: 'Location 3', neighbors: {"1": 10, "2": 2, "7": 3, "6": 1} },
      { locationID: 4, locationName: 'Location 4', neighbors: {"10": 2} },
      { locationID: 5, locationName: 'Location 5', neighbors: {"10": 5, "6": 3} },
      { locationID: 6, locationName: 'Location 6', neighbors: {"3": 1, "9": 4, "5": 3} },
      { locationID: 7, locationName: 'Location 7', neighbors: {"2": 2, "3": 3} },
      { locationID: 8, locationName: 'Location 8', neighbors: {"3": 7, "9": 6} },
      { locationID: 9, locationName: 'Location 9', neighbors: {"6": 4, "8": 6} },
      { locationID: 10, locationName: 'Location 10', neighbors: {"4": 2, "5": 5} },
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
