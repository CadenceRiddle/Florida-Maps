const Sequelize = require('sequelize');
require('dotenv').config(); // This loads the environment variables from the .env file

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    logging: false
  }
);

const Location = sequelize.define('locations', {
  locationID: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  locationName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  neighbors: {
    type: Sequelize.DataTypes.JSON,
    allowNull: false
  }
});

sequelize.sync({ alter: true })

module.exports = {
  sequelize,
  Location
};