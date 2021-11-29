const sequelize = require('./db')
const { DataTypes } = require('sequelize')

const Category = sequelize.define('category', {
  // 在这里定义模型属性
  name: {
    type: DataTypes.STRING,
    allowNull:false,
  }
}, {
  // 这是其他模型参数
});

module.exports = Category;