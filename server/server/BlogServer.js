const { Op } = require('sequelize');
const Blog = require('../models/Blog')
const Category = require('../models/Category');
const { getCommentByBlogId } = require('./CommentServer');
// 新增
exports.addBlog = async function (BlogObj){
  try {
    const res = await Blog.create(BlogObj);
    return res.toJSON();
  } catch (error) {
    console.log(error)
  }
  
}  

// 删除
exports.deleteBlog = async function (BlogId){
  const res = await Blog.destroy({
    where: {
      id:+BlogId
    }
  });
  return true;
}

// 修改
exports.updateBlog = async function (BlogId,BlogObj){
  const res = await Blog.update(BlogObj,{
    where:{
      id:+BlogId
    }
  });
  if(res === 0){
    return null;
  }
  return res.toString();
}

// 分页查询所有博客
exports.getBlog = async function (page = 1, limit = 10,cate = -1,title = ''){
  const where = {};
  if(+cate !== -1){
    where.categoryId = cate;
  }
  where.title = {
    [Op.like]:`%${title}%`
  }

  const result = await Blog.findAndCountAll({
    attributes:['id','title','description','scanNumber','commentNumber','thumb','createdAt'],//
    include:[Category],//include: 包含关系（联表查询）
    where,
    order:[['createdAt','DESC']],
    offset:(page - 1) * limit, //跳过多少条
    limit:+limit  //取出多少条
  })
  
  const rows = JSON.parse(JSON.stringify(result.rows)).map(async item=>{
    const comments = await getCommentByBlogId(item.id);
    item.commentNumber = comments;
    return item;
  })
  return {
    total:result.count,
    rows:await Promise.all(rows)
  } 
}

// 根据id查询博客
exports.getBlogById = async function (id){
  const res = await Blog.findAll({
    include:[Category],
    where:{
      id
    }
  });
  return JSON.parse(JSON.stringify(res))[0];
}


// // 根据文章id进行浏览量+1
// exports.updateBlogScanNumber = async function (BlogId,scanNumber){
//   const res = await Blog.update({
//     scanNumber
//   },{
//     where:{
//       id:+BlogId
//     }
//   });
//   if(res === 0){
//     return null;
//   }
//   return res.toString();
// }