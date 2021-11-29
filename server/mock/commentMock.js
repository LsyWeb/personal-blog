const Mock = require('mockjs');
const Comment = require('../models/Comment')

const result = Mock.mock({
  "datas|450": [
    {
      "id|+1": 1,
      "nickname": "@ctitle",
      "content": "@ctitle",
      "avatar":Mock.Random.image('200x100'),
      "blogId|1-150":1
    }
  ]
})
// console.log(result);
Comment.bulkCreate(result.datas).catch(err=>console.log(err))