// sequelize.js
const Sequelize = require('sequelize');

const createSequelizeInstance = (config) => {
  return new Sequelize(
    config.DB_NAME,
    config.DB_USER,
    config.DB_PASSWORD,
    {
      dialect: 'postgres',
      logging: false,
    }
  );
};

const defineLocationModel = (sequelize) => {
  return sequelize.define('locations', {
    locationID: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    locationName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    neighbors: {
      type: Sequelize.DataTypes.JSON,
      allowNull: false,
    },
  });
};

module.exports = {
  createSequelizeInstance,
  defineLocationModel,
};
