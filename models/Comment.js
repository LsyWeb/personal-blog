const sequelize = require('./db')
const { DataTypes } = require('sequelize')

const Comment = sequelize.define('comment', {
  // 在这里定义模型属性
  nickname: {
    type: DataTypes.STRING,
    allowNull:false
  },
  content:{
    type:DataTypes.STRING,
    allowNull:false
  },
  avatar:{
    type:DataTypes.STRING
  },
}, {
  // 这是其他模型参数

});

module.exports = Comment 