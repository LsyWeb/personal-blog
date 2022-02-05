const { Sequelize } = require('sequelize');
const config = require('../config/default')
const sequelize = new Sequelize(config.database.DATABASE,config.database.USER, config.database.PASSWORD, {
  host: config.database.HOST,
  dialect: 'mysql',
  logging:false//关闭日志
});

module.exports = sequelize;