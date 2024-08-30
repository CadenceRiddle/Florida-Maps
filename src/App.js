const express = require("express");
const locations_route = require('./locations_route');
const { sequelize } = require('./sequelize');
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db: sequelize });

const app = express();
app.use('/api', locations_route);

module.exports = app;