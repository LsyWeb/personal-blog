const express = require('express');
const {getBlog, addBlog, getBlogById, deleteBlog, updateBlog,updateBlogScanNumber} = require('../../server/BlogServer');
const { getResult } = require('../getResult');
const router = express.Router();

// 分页获取博客
router.get('/',async (req,res)=>{
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const cate = req.query.cate || -1;
  const title = req.query.title || '';
  const result = await getBlog(page,limit,cate,title);
  res.send(getResult(result,'查询成功'))
})

// 新增博客
router.post('/', async (req, res) => {
  const result = await addBlog(req.body);
  res.send(getResult(result, '新增成功'));
})

// 根据id查询博客
router.get('/:id', async (req, res) => {
  const result = await getBlogById(req.params.id);
  let msg = '';
  if (result) {
    msg = '查询成功'
  } else {
    msg = '该博客不存在'
  }
  res.send(getResult(result, msg));
})

// 删除博客
router.delete('/:id', async (req, res) => {
  const result = await deleteBlog(req.params.id);
  let msg = '';
  if (result) {
    msg = '删除成功'
  } else {
    msg = '该博客不存在'
  }
  res.send(getResult(result, msg));
})

// 修改博客信息
router.put('/:id', async (req, res) => {
  const result = await updateBlog(req.params.id, req.body);
  res.send(getResult(result, '修改成功'));
})

// // 修改博客信息
// router.put('/:id', async (req, res) => {
//   const result = await updateBlogScanNumber(req.params.id, req.body);
//   res.send(getResult(result, '修改成功'));
// })



module.exports = router;