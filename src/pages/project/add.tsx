import { addProject } from '@/api/project';
import { projectFormDataType } from '@/types/projectFormDataType';
import React,{useState} from 'react'
import ProjectForm from './components/ProjectForm';
import { message } from 'antd'
import { history } from 'umi';

const add = () => {
  const onSubmit =async (formData:projectFormDataType)=>{
    const res = await addProject(formData);

    if(res.code === 0){
      message.success(res.msg);
      history.push('/project/list');
    }else{
      message.error(res.msg);
    }
  }
  return (
    <div className='project-add-container' style={{width:500,margin:'0 auto'}}>
      <ProjectForm onSubmit={onSubmit}  />
    </div>
  )
}
add.title = '新增项目';
add.wrappers = ['@/wrappers/auth'];
export default add;
