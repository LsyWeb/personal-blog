const Mock = require('mockjs');
const Setting = require('../models/Setting')

const result = Mock.mock({
  "datas": [
    {
      "avatar":'/img/touxiang.png',
      "siteTitle": "刘帅洋的个人博客",
      "github": "https://github.com/LsyWeb",
      "qq": "2913304963",
      "qqQrCode": "/img/erweima/qq.png",
      "weixin": "qqq18438015189",
      "weixinQrCode": "/img/erweima/weixin.png",
      "email": "liushuaiyang@aliyun.com",
      "icp": "",
      "githubName": "LsyWeb",
      "favicon": "/img/ico/favicon.ico"
    }
  ]
})
// console.log(result);
Setting.bulkCreate(result.datas).catch(err=>console.log(err))