const Comment = require('../models/Comment')
const Blog = require('../models/Blog');
// 新增
exports.addComment = async function (CommentObj) {
  try {
    const res = await Comment.create(CommentObj);
    return res.toJSON();
  } catch (error) {
    console.log(error)
  }

}

// 删除
exports.deleteComment = async function (CommentId) {
  const res = await Comment.destroy(CommentId);
  return res.toJSON();
}

// 修改
exports.updateComment = async function (CommentId, CommentObj) {
  const res = await Comment.update(CommentObj, {
    where: {
      id: CommentId
    }
  });
  return res.toString();
}

// 根据博客id查询所有评论
exports.getCommentByBlogId = async function(blogId = -1){
  const where = {};
  if (blogId !== -1) {
    where.blogId = blogId;
  }

  const result = await Comment.findAndCountAll({
    attributes: ['id', 'nickname', 'content', 'avatar', 'createdAt'],//
    where,
  })
  return result.count;
}

// 分页查询所有评论
exports.getComment = async function (page = 1, limit = 10, blogId = -1) {
  const where = {};
  if (blogId !== -1) {
    where.blogId = blogId;
  }

  const result = await Comment.findAndCountAll({
    attributes: ['id', 'nickname', 'content', 'avatar', 'createdAt'],//
    include: [Blog],//include: 包含关系（联表查询）
    where,
    order:[['createdAt','DESC']],
    offset: (page - 1) * limit, //跳过多少条
    limit: +limit  //取出多少条
  })
  return {
    total: result.count,
    rows: JSON.parse(JSON.stringify(result.rows))
  }
}

// 根据id查询评论
exports.getCommentById = async function (id) {
  const res = await Comment.findByPk(id);
  return res.toJSON();
}
