const { Op } = require('sequelize/dist');
const Project = require('../models/Project')

// 新增项目
exports.addProject = async function (ProjectObj){
  try {
    const res = await Project.create(ProjectObj);
    return res.toJSON();
  } catch (error) {
    console.log(error)
  }
  
}  

// 删除项目
exports.deleteProject = async function (ProjectId){
  const res = await Project.destroy({
    where:{
      id:ProjectId
    }
  });
  return res.toString();
}

// 修改项目
exports.updateProject = async function (ProjectId,ProjectObj){
  const res = await Project.update(ProjectObj,{
    where:{
      id:ProjectId
    }
  });
  return res.toString();
}

// 查询Project
exports.getProject = async function (name = ''){
  const where = {};
  where.name = {
    [Op.like]:`%${name}%`
  }
  const result = await Project.findAll({
    where,
    order:['order']
  })
  return JSON.parse(JSON.stringify(result))
}


// 根据id查询分类
exports.getProjectById = async function (id) {
  const res = await Project.findByPk(id);
  return res.toJSON();
}