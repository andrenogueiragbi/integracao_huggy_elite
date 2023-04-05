const Sequelize = require('sequelize');
const dbConfig = require('../config/databaseMCK');


const User = require('../modals/User')
const Log = require('../modals/Log')
const Ip = require('../modals/Ip')



const connection = new Sequelize(dbConfig);

User.init(connection);
Log.init(connection);
Ip.init(connection);

module.exports = connection;