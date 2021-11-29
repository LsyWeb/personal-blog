const express = require('express');
const {getProject, addProject, deleteProject, updateProject,getProjectById} = require('../../server/ProjectServer');
const { getResult, getErr } = require('../getResult');
const router = express.Router();

// 获取项目
router.get('/',async (req,res)=>{
  try {
    const name = req.query.name || '';
    const result = await getProject(name);
    res.send(getResult(result,'查询成功'))
  } catch (error) {
    res.send(getErr('查询失败',500))
  }
  
})

// 根据id获取项目
router.get('/:id', async (req, res) => {
  const result = await getProjectById(req.params.id);
  res.send(getResult(result, '查询成功'));
})

// 新增项目
router.post('/', async (req, res) => {
  const result = await addProject(req.body);
  res.send(getResult(result, '新增成功'));
})



// 删除项目
router.delete('/:id', async (req, res) => {
  const result = await deleteProject(req.params.id);
  let msg = '';
  if (result) {
    msg = '删除成功'
  } else {
    msg = '该项目不存在'
  }
  res.send(getResult(result, msg));
})

// 修改项目信息
router.put('/:id', async (req, res) => {
  const result = await updateProject(req.params.id, req.body);
  res.send(getResult(result, '修改成功'));
})


module.exports = router;