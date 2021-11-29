const Banner = require('../models/Banner')
const Blog = require('../models/Blog');
// 新增
exports.addBanner = async function (BannerObj){
  try {
    const res = await Banner.create(BannerObj);
    return res.toJSON();
  } catch (error) {
    console.log(error)
  }
  
}  

// 删除
exports.deleteBanner = async function (BannerId){
  const res = await Banner.destroy(BannerId);
  return res.toJSON();
}

// 修改
exports.updateBanner = async function (BannerId,BannerObj){
  const res = await Banner.update(BannerObj,{
    where:{
      id:BannerId
    }
  });
  return res.toString();
}

// 分页查询所有留言
exports.getBanner = async function (page = 1, limit = 10){
  const result = await Banner.findAll()
  return JSON.parse(JSON.stringify(result))
}

// 根据id查询留言
exports.getBannerById = async function (id){
  const res = await Banner.findByPk(id);
  return res.toJSON();
}
