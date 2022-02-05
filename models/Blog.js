const sequelize = require('./db')
const { DataTypes } = require('sequelize')
const Blog = sequelize.define('blog', {
  // 在这里定义模型属性
  title: {
    type: DataTypes.STRING,
    allowNull:false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull:false
  },
  scanNumber:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  commentNumber:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  description:{
    type:DataTypes.STRING,
    allowNull:false
  },
  thumb:{
    type:DataTypes.STRING,
    allowNull:false
  }
}, {
  // 这是其他模型参数
});

module.exports = Blog