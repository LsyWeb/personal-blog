const Mock = require('mockjs');
const Category = require('../models/Category')

const result = Mock.mock({
  "datas|15": [
    {
      "id|+1": 1,
      "name": "@ctitle",
      
    }
  ]
})
// console.log(result);
Category.bulkCreate(result.datas)