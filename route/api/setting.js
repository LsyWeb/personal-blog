const express = require('express');
const {getSetting, addSetting, deleteSetting, updateSetting} = require('../../server/SettingServer');
const { getResult } = require('../getResult');
const router = express.Router();

// 获取设置
router.get('/',async (req,res)=>{
  try {
    const result = await getSetting();
    res.send(getResult(result,'查询成功'))
  } catch (error) {
    console.log(error)
  }
  
})

// 新增设置
router.post('/', async (req, res) => {
  const result = await addSetting(req.body);
  res.send(getResult(result, '新增成功'));
})



// 删除设置
router.delete('/:id', async (req, res) => {
  const result = await deleteSetting(req.params.id);
  let msg = '';
  if (result) {
    msg = '删除成功'
  } else {
    msg = '该设置不存在'
  }
  res.send(getResult(result, msg));
})

// 修改设置信息
router.put('/:id', async (req, res) => {
  const result = await updateSetting(req.params.id, req.body);
  res.send(getResult(result, '修改成功'));
})


module.exports = router;