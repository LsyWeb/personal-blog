const sequelize = require('./db')
const { DataTypes } = require('sequelize')
const Banner = sequelize.define('banner', {
  // 在这里定义模型属性
  midImg: {
    type: DataTypes.STRING,
    allowNull:false
  },
  bigImg: {
    type: DataTypes.STRING,
    allowNull:false
  },
  title:{
    type:DataTypes.STRING,
    allowNull:false
  },
  description:{
    type:DataTypes.STRING,
    allowNull:false
  },
}, {
  // 这是其他模型参数
});

module.exports = Banner