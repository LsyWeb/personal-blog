import { addCategory } from '@/api/category';
import React from 'react';
import {message} from 'antd'
import CategoryForm from './components/CategoryForm'
import { history } from 'umi';

const add = () => {
  const onSubmit = async (formData:{name:string})=>{
    const res = await addCategory(formData);
    if(res.code === 0){
      message.success(res.msg);
      history.push('/category/list');
    }
    else{
      message.error(res.msg);
    }
  }

  return (
    <div className="category-add-container" style={{width:500,margin:'0 auto'}}>
      <CategoryForm onSubmit={onSubmit} />
    </div>
  );
};
add.title = '新增分类';
add.wrappers = ['@/wrappers/auth'];
export default add;
