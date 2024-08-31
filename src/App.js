
const express = require("express");
const session = require('express-session');
const { createSequelizeInstance, defineLocationModel } = require('./sequelize');
const { createLocationsRouter } = require('./locations_route');
const { createAlgorithmRouter } = require('./algorithm/route');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const createApp = (config) => {
  const app = express();
  const sequelize = createSequelizeInstance(config);
  const Location = defineLocationModel(sequelize);

  const sessionStore = new SequelizeStore({ db: sequelize });

  app.use(express.json());

  const locationsRouter = createLocationsRouter({ Location });
  const algorithmRouter = createAlgorithmRouter({ Location });
  app.use('/api', locationsRouter);
  app.use('/api', algorithmRouter);

  return app;
};

module.exports = createApp;
