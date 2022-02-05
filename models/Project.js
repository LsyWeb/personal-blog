const sequelize = require('./db')
const { DataTypes } = require('sequelize')

const Project = sequelize.define('project', {
  // 在这里定义模型属性
  name: {
    type: DataTypes.STRING,
    allowNull:false
  },
  url:{
    type:DataTypes.STRING,
    allowNull:false
  },
  github:{
    type:DataTypes.STRING,
    allowNull:false
  },
  description:{
    type:DataTypes.TEXT,
    allowNull:false
  },
  thumb:{
    type:DataTypes.STRING,
    allowNull:false
  },
  order:{
    type:DataTypes.INTEGER,
    allowNull:false,
  },
}, {
  // 这是其他模型参数

});

module.exports = Project