const Message = require('../models/Message')
const Blog = require('../models/Blog');
// 新增
exports.addMessage = async function (MessageObj){
  try {
    const res = await Message.create(MessageObj);
    return res.toJSON();
  } catch (error) {
    console.log(error)
  }
  
}  

// 删除
exports.deleteMessage = async function (MessageId){
  const res = await Message.destroy(MessageId);
  return res.toJSON();
}

// 修改
exports.updateMessage = async function (MessageId,MessageObj){
  const res = await Message.update(MessageObj,{
    where:{
      id:MessageId
    }
  });
  return res.toString();
}

// 分页查询所有留言
exports.getMessage = async function (page = 1, limit = 10){
  const result = await Message.findAndCountAll({
    attributes:['id','nickname','content','avatar','createdAt'],//
    offset:(page - 1) * limit, //跳过多少条
    limit:+limit,  //取出多少条
    order:[['createdAt','DESC']]
  })
  return {
    total:result.count,
    rows:JSON.parse(JSON.stringify(result.rows))
  }
}

// 根据id查询留言
exports.getMessageById = async function (id){
  const res = await Message.findByPk(id);
  return res.toJSON();
}
