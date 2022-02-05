const express = require('express');
const {getBanner, addBanner, deleteBanner, updateBanner} = require('../../server/BannerServer');
const { getResult } = require('../getResult');
const router = express.Router();

// 获取轮播图
router.get('/',async (req,res)=>{
  try {
    const result = await getBanner();
    res.send(getResult(result,'查询成功'))
  } catch (error) {
    console.log(error)
  }
  
})

// 新增轮播图
router.post('/', async (req, res) => {
  const result = await addBanner(req.body);
  res.send(getResult(result, '新增成功'));
})



// 删除轮播图
router.delete('/:id', async (req, res) => {
  const result = await deleteBanner(req.params.id);
  let msg = '';
  if (result) {
    msg = '删除成功'
  } else {
    msg = '该轮播图不存在'
  }
  res.send(getResult(result, msg));
})

// 修改轮播图信息
router.put('/:id', async (req, res) => {
  const result = await updateBanner(req.params.id, req.body);
  res.send(getResult(result, '修改成功'));
})


module.exports = router;