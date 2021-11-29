const Category = require('../models/Category');
const Blog = require('../models/Blog');
const { Op } = require('sequelize')
const sequelize = require('sequelize')

// 新增
exports.addCategory = async function (CategoryObj) {
  try {
    const res = await Category.create(CategoryObj);
    return res.toJSON();
  } catch (error) {
    console.log(error)
  }

}


// 分页查询所有分类
exports.getCategory = async function (page = 1, limit = 10, name = '') {
  const result = await Category.findAndCountAll({
    attributes: ['id', 'name', 'createdAt' ],
    include:[Blog],//include: 包含关系（联表查询）
    where: {
      name:{
        [Op.like]: `%${name}%`
      }
    },
    offset: (page - 1) * limit, //跳过多少条
    limit: +limit  //取出多少条
    
  })
  const count = await Category.count({
    where:{
      name:{
        [Op.like]: `%${name}%`
      }
    }
  })
  const rows = JSON.parse(JSON.stringify(result.rows)).map(async item=>{
    item.blogNumber = item.blogs.length;
    return item;
  })
  return {
    total: count,
    blogs:result.count,
    rows:await Promise.all(rows)
  }
}

// 根据id查询分类
exports.getCategoryById = async function (id) {
  const res = await Category.findByPk(id);
  return res.toJSON();
}

// 删除
exports.deleteCategory = async function (CategoryId) {
  const res = await Category.destroy({
    where:{
      id:CategoryId
    }
  });
  return res.toString();
}

// 修改
exports.updateCategory = async function (CategoryId, CategoryObj) {
  const res = await Category.update(CategoryObj, {
    where: {
      id: CategoryId
    }
  });
  return res.toString();
}
