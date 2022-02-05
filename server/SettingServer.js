const Setting = require('../models/Setting')

// 新增设置
exports.addSetting = async function (SettingObj){
  try {
    const res = await Setting.create(SettingObj);
    return res.toJSON();
  } catch (error) {
    console.log(error)
  }
  
}  

// 删除设置
exports.deleteSetting = async function (SettingId){
  const res = await Setting.destroy({
    where:{
      id:SettingId
    }
  });
  return res.toJSON();
}

// 修改设置
exports.updateSetting = async function (SettingId,SettingObj){
  const res = await Setting.update(SettingObj,{
    where:{
      id:SettingId
    }
  });
  return res.toString();
}

// 查询setting 
exports.getSetting = async function (){
  const result = await Setting.findAll()
  // console.log(result)
  return JSON.parse(JSON.stringify(result))[0]

}