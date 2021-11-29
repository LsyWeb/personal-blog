const Mock = require('mockjs');
const Project = require('../models/Project')

const result = Mock.mock({
  "data": [
    {
  
      "id": 1,
  
      "name": "QQ音乐播放器",
  
      "url": "https://lsyweb.github.io/MusicPlayer/",
  
      "github": "https://github.com/LsyWeb/MusicPlayer",
  
      "description": "该项目是本人学习了ES6、模块化开发、以及webpack打包构建工具之后，利用HTML、CSS、JavaScript（ES6+）、Fetch等技术，使用模块化开发规范，做出的一个手机端的音乐播放器，可以实现音乐播放的开始、暂停、切换、进度拖动等功能，",
  
      "thumb": "https://lsyweb.github.io/assest/project-image/musicPlayer.jpg",
  
      order: 1
  
    },
  
    {
  
      "id": 2,
  
      "name": "学生信息管理系统",
  
      "url": "https://lsyweb.github.io/To-Do-List/",
  
      "github": "https://github.com/LsyWeb/To-Do-List",
  
      "description": "该项目是本人在学习完React全家桶，利用React全家桶、umijs以及ant-design等技术，实现了登录注册以及学生信息的增、改、删、查，完成学生信息的管理",
  
      "thumb": "https://lsyweb.github.io/assest/project-image/To-Do-List.jpg",
  
      order: 2
  
    },
  
    {
  
      "id": 3,
  
      "name": "星巴克",
  
      "url": "https://lsyweb.github.io/XingBaKe/",
  
      "github": "https://github.com/LsyWeb/XIingBaKe",
  
      "description": "该项目主要是利用Boostrap库进行开发，仿写的星巴克官网，利用了Boostrap库的响应式布局的特点，实现l在不同尺寸设备下的适配",
  
      "thumb": "https://lsyweb.github.io/assest/project-image/xingbake.jpg",
  
      order: 3
  
    },
  
    {
  
      "id": 4,
  
      "name": "JD首页",
  
      "url": "https://lsyweb.github.io/JD/",
  
      "github": "https://github.com/LsyWeb/JD",
  
      "description": "该项目主要是利用HTML、CSS、jQuery、Mock.js实现的仿写京东商城首页（pc），写完之后本人对电商式页面的布局、动态效果、以及Ajax动态数据请求有了更深刻的理解",
  
      "thumb": "https://lsyweb.github.io/assest/project-image/jd.jpg",
  
      order: 4
  
    },
  
    {
  
      "id": 5,
  
      "name": "像素鸟小游戏",
  
      "url": "https://lsyweb.github.io/bird/",
  
      "github": "https://github.com/LsyWeb/bird",
  
      "description": "该小游戏主要是利用ES6中的构造函数进行面向对象的方式进行开发，用户按下回车即可开始畅玩",
  
      "thumb": "https://lsyweb.github.io/assest/project-image/bird.jpg",
  
      order: 5
  
    },
  
    {
  
      "id": 6,
  
      "name": "数字魔方",
  
      "url": "https://lsyweb.github.io/NumMagic/",
  
      "github": "https://github.com/LsyWeb/NumMagic",
  
      "description": "该效果主要使用了CSS3中的动画，并结合着js的DOM操作来实现了这一效果，对本人理解CSS3动画效果有着很大的帮助",
  
      "thumb": "https://lsyweb.github.io/assest/project-image/numMagic.jpg",
  
      order: 6
  
    }
  ]
})
// console.log(result);
Project.bulkCreate(result.data)