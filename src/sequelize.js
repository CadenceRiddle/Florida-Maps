const Sequelize = require('sequelize');
const sequelize = new Sequelize('florida-maps', 'postgres', 'Ga11ego$0908', {
  dialect: 'postgres'
});

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

sequelize.sync({ alter: true }).then(() => {
  console.log('Synced to database successfully');
}).catch((err) => {
  console.log('Failed to sync to database');
});;

module.exports = {
  sequelize,
  Location
};