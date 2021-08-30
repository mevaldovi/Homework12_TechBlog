const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  //insert JAWSDB name, host, username and password info via Heroku JAWSDB extension
  sequelize = new Sequelize( 
    "mm75cm7xc972el9e",
    "dq2elq1hf2ur6az4",
    "t6fxsb1odvivhva2",
    {
      host: 's29oj5odr85rij2o.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
