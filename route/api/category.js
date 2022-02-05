const express = require('express');
const {getCategory, addCategory, getCategoryById, deleteCategory, updateCategory} = require('../../server/CategoryServer');
const { getResult } = require('../getResult');
const router = express.Router();

// 分页获取分类
router.get('/',async (req,res)=>{
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const name = req.query.name || '';
  try {
    const result = await getCategory(page,limit,name);
  res.send(getResult(result,'查询成功'))
  } catch (error) {
    console.log(error)
  }
  
})

// 新增分类
router.post('/', async (req, res) => {
  const result = await addCategory(req.body);
  res.send(getResult(result, '新增成功'));
})

// 根据id查询分类
router.get('/:id', async (req, res) => {
  const result = await getCategoryById(req.params.id);
  let msg = '';
  if (result) {
    msg = '查询成功'
  } else {
    msg = '该分类不存在'
  }
  res.send(getResult(result, msg));
})

// 删除分类
router.delete('/:id', async (req, res) => {
  const result = await deleteCategory(req.params.id);
  let msg = '';
  if (result) {
    msg = '删除成功'
  } else {
    msg = '该分类不存在'
  }
  res.send(getResult(result, msg));
})

// 修改分类信息
router.put('/:id', async (req, res) => {
  const result = await updateCategory(req.params.id, req.body);
  res.send(getResult(result, '修改成功'));
})


module.exports = router;