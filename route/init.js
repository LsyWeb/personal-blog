const express = require('express');
const path = require('path')
const cors = require('cors');

const config = require('../config/default')

const app = express();

// 静态资源处理
app.use(express.static(path.resolve(__dirname, '../public')))

// body请求格式处理
app.use(express.json());

// 解决跨域
app.use(cors(
  {
    origin(origin, cb) {
      if (!origin) {//不跨域的时候不存在origin
        cb(null, "*")
        return;
      }
      cb(null, origin)
    },
    credentials: true
  }
))

app.use('/api/blog', require('./api/blog'))
app.use('/api/category', require('./api/category'))
app.use('/api/comment', require('./api/comment'))
app.use('/api/message', require('./api/message'))
app.use('/api/setting', require('./api/setting'))
app.use('/api/banner', require('./api/banner'))
app.use('/api/project', require('./api/project'))
app.use('/api/upload', require('./api/upload'))

app.listen(config.port, () => {
  console.log('开始监听',config.port)
})