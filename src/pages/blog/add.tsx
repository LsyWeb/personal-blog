import { addBlog } from '@/api/blog';
import React, { useEffect, useState } from 'react';
import {message} from 'antd'
import BlogForm from './components/BlogForm';
import { blogFormDataType } from '@/types/blogFormDataType';
import { history } from 'umi';
const add = () => {
  const onAddSumbit = async (formData:blogFormDataType)=>{
    const resp = await addBlog(formData);
    if(resp.code === 0){
      message.success('新增成功');
      history.push('/blog/list');
    }
    else{
      message.error(resp.msg);
    }
  }

  return (
    <div className="blog-add-container" style={{width:500,margin:'0 auto'}}>
      <BlogForm onSubmit={onAddSumbit}  />
    </div>
  );
};



add.title = '新增博客';
add.wrappers = ['@/wrappers/auth'];
export default add;
