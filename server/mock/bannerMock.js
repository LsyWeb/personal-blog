const Mock = require('mockjs');
const Banner = require('../models/Banner')

const result = Mock.mock({
  "datas": [
    {

      bigImg:'http://mdrs.yuanjin.tech/img/20201031141350.jpg',
      midImg: "http://mdrs.yuanjin.tech/img/20201031141507.jpg",
      title: '凛冬将至',
      description: '人唯有恐惧的时候方能勇敢'
    },
    {

      bigImg:'http://mdrs.yuanjin.tech/img/20201031205551.jpg',
      midImg: "http://mdrs.yuanjin.tech/img/20201031205550.jpg",
      title: '血火同源',
      description: '如果我回头，一切都完了'
    },
    {

      bigImg:'http://mdrs.yuanjin.tech/img/20201031204403.jpg',
      midImg: "http://mdrs.yuanjin.tech/img/20201031204401.jpg",
      title: '听我怒吼',
      description: '艾欧尼亚昂扬不灭'
    }
  ]
})
// console.log(result);
Banner.bulkCreate(result.datas).catch(err=>console.log(err))