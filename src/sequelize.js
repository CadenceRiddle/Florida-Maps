const Sequelize = require('sequelize');
const sequelize = new Sequelize('florida-maps', 'postgres', 'Gallego$0908', {
  dialect: 'postgres'
});

sequelize.authenticate().then(() => {
  console.log('connected successfully to database')
}).catch((err)=>{
  console.log(err);
})

const Locations = sequelize.define('locations', {
  locationID: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },

  locationName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },

  neighbors : {
    type: Sequelize.DataTypes.JSON,
    allowNull: false
  }
});

Locations.sync({alter: true}).then(() => {
  console.log('Synced to database successfully');
}).catch((err) => {
  console.log('Failed to sync to database');
});

module.exports = {
  sequelize, 
  Locations
}