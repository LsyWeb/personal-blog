const Mock = require('mockjs');
const Message = require('../models/Message')

const result = Mock.mock({
  "datas|450": [
    {
      "id|+1": 1,
      "nickname": "@ctitle",
      "content": "@ctitle",
      "avatar":Mock.Random.image('200x100'),
    }
  ]
})
// console.log(result);
Message.bulkCreate(result.datas)