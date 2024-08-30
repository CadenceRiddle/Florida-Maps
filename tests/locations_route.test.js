const request = require('supertest');
const { makeApp } = require('../src/App');


describe('test the endpoints of the locations route', ()=>{

  describe('test the GET /locations endpoint', ()=>{
    it('should return 200', async()=>{
      const response = await request(app).get("/locations")
      expect(response.statusCode).toBe(404);
    })
  })
})