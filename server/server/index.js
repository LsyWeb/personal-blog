require('../models/init')
const { addBlog, getBlog, updateBlog } = require("./BlogServer");
const { addCategory, getCategory } = require('./CategoryServer');
const { addComment, getComment } = require('./CommentServer');
const { addMessage, getMessage } = require('./MessageServer');

// 新增
// addCategory({
//   name:'后端开发'
// });

// addBlog({
//   title:'这是一个标题',
//   content:'xiaojun',
//   scanNumber:10,
//   commentNumber :19,
//   description:'这是一个描述', 
//   categoryId:3
// }).then(res=>console.log(res)).then(err=>console.log(err)); 

// addComment({
//   nickname:'小红',
//   content:'小红真笨',
//   avatar:'小红的图片',
//   blogId:21
// })

// addMessage({
//   nickname: '小红',
//   content: '小红真笨',
//   avatar: '小红的图片',
// })

// 查
// getBlog(1,10,3).then(res=>console.log(res));

// getCategory(1,5,'前端').then(res=>console.log(res))

// getComment(1,10).then(res=>console.log(res))

// getMessage().then(res=>console.log(res))
// ;

// 改
// updateBlog(20,{
//   title:'小刘'
// })
