const express = require('express');
const {getMessage, addMessage, getMessageById, deleteMessage, updateMessage} = require('../../server/MessageServer');
const { getResult } = require('../getResult');
const router = express.Router();

// 分页获取留言
router.get('/',async (req,res)=>{
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const result = await getMessage(page,limit);
  res.send(getResult(result,'查询成功'))
})

// 新增留言
router.post('/', async (req, res) => {
  console.log(req.body)
  const result = await addMessage(req.body);
  res.send(getResult(result, '新增成功'));
})

// 根据id查询留言
router.get('/:id', async (req, res) => {
  const result = await getMessageById(req.params.id);
  let msg = '';
  if (result) {
    msg = '查询成功'
  } else {
    msg = '该留言不存在'
  }
  res.send(getResult(result, msg));
})

// 删除留言
router.delete('/:id', async (req, res) => {
  const result = await deleteMessage(req.params.id);
  let msg = '';
  if (result) {
    msg = '删除成功'
  } else {
    msg = '该留言不存在'
  }
  res.send(getResult(result, msg));
})

// 修改留言信息
router.put('/:id', async (req, res) => {
  const result = await updateMessage(req.params.id, req.body);
  res.send(getResult(result, '修改成功'));
})



module.exports = router;