const express = require('express');
const { getComment, addComment, getCommentById, deleteComment, updateComment } = require('../../server/CommentServer');
const { getResult } = require('../getResult');
const router = express.Router();

// 分页获取评论
router.get('/', async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const blogId = req.query.blogId || -1;
  const result = await getComment(page, limit, blogId);
  res.send(getResult(result, '查询成功'));
})

// 新增评论
router.post('/', async (req, res) => {
  const result = await addComment(req.body);
  res.send(getResult(result, '新增成功'));
})

// 根据id查询评论
router.get('/:id', async (req, res) => {
  const result = await getCommentById(req.params.id);
  let msg = '';
  if (result) {
    msg = '查询成功'
  } else {
    msg = '该评论不存在'
  }
  res.send(getResult(result, msg));
})

// 删除评论
router.delete('/:id', async (req, res) => {
  const result = await deleteComment(req.params.id);
  let msg = '';
  if (result) {
    msg = '删除成功'
  } else {
    msg = '该评论不存在'
  }
  res.send(getResult(result, msg));
})

// 修改评论信息
router.put('/:id', async (req, res) => {
  const result = await updateComment(req.params.id, req.body);
  res.send(getResult(result, '修改成功'));
})



module.exports = router;