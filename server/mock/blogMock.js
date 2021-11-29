const Mock = require('mockjs');
const Blog = require('../models/Blog')

const result = Mock.mock({
  "datas|150": [
    {
      "id|+1": 1,
      "title": "@ctitle",
      "content": "@ctitle",
      "scanNumber|1-100":1,
      "commentNumber|1-100":1,
      "description":'@ctitle',
      "thumb":Mock.Random.image('200x100'),
      "categoryId|1-10":1
    }
  ]
})
// console.log(result);
Blog.bulkCreate(result.datas).catch(err=>console.log(err))