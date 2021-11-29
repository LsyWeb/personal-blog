const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'../../public/img/upload'))
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const ext = path.extname(originalname);
    const filename = originalname.split(ext)[0]
    cb(null, filename + '-' + Date.now() + ext)
  }
})

const upload = multer({ storage })

router.post('/', upload.single('img'), function (req, res, next) {
  // req.file 是 `img` 文件的信息
  // req.body 将具有文本域数据，如果存在的话
  const url = `/img/upload/${req.file.filename}`;
  res.send({
    code:0,
    msg:'',
    data:{
      url
    }
  })
})
module.exports = router;