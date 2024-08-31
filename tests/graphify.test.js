const { graphify } = require('../src/algorithm/graphify');
const express = require('express');
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

describe('should test the graphify function', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock data after each test
  });

  it('should be able to graph the database', async () => {
    const mockLocations = [
      { locationID: 1, locationName: 'Location 1', neighbors: {"2": 5, "4": 10}},
      { locationID: 2, locationName: 'Location 2', neighbors: {"1": 5, "3": 6}},
      { locationID: 3, locationName: 'Location 3', neighbors: {"2": 6}},
      { locationID: 4, locationName: 'Location 4', neighbors: {"1": 10}}
    ];
    
    Location.findAll.mockResolvedValue(mockLocations);

    const graph = await graphify(Location);

    // Expected graph structure
    const expectedGraph = {
      1: { 2: 5, 4: 10 },
      2: { 1: 5, 3: 6 },
      3: { 2: 6 },
      4: { 1: 10 }
    };

    expect(graph).toEqual(expectedGraph);
    expect(Location.findAll).toHaveBeenCalledTimes(1);
  });
});
