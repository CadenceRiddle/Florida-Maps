const express = require("express");
const app = express();
const PORT = 3000;
const locations_route = require('./locations_route');
const { sequelize } = require('./sequelize');
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db: sequelize });

app.use('/api', locations_route)


app.listen(PORT, async ()=>{
 await console.log(`Listening on port ${PORT}`);
})

app.get('/', (req, res, next)=>{
  res.status(200).send("Hello world");
})
