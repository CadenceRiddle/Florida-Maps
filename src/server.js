// server.js
require('dotenv').config();
const createApp = require('./App');

const config = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  PORT: process.env.PORT
};

const app = createApp(config);

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});
