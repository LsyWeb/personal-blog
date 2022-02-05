import { editBlog, getBlogById } from '@/api/blog';
import { blogFormDataType } from '@/types/blogFormDataType';
import React, { useEffect, useState } from 'react';
import { history, useParams } from 'umi';
import { Spin, message } from 'antd';
import BlogForm from '../components/BlogForm';
const detail = (props: any) => {
  const params: any = useParams();
  const [defaultFormData, setDefaultFormData] = useState<
    blogFormDataType | undefined
  >();
  useEffect(() => {
    getBlogById(params.id).then((res) => {
      console.log(res.data);
      setDefaultFormData(res.data);
    });
  }, []);
  const onEditSubmit = async (formData: blogFormDataType) => {
    const resp = await editBlog(params.id, formData);
    if (resp.code === 0) {
      message.success(resp.msg);
    } else {
      message.error(resp.msg);
    }
  };
  return (
    <div className="detail-container" style={{ margin: '0 auto', width: 500 }}>
      {defaultFormData ? (
        <BlogForm defaultFormData={defaultFormData} onSubmit={onEditSubmit} />
      ) : (
        <Spin
          style={{
            width: 500,
            minHeight: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></Spin>
      )}
    </div>
  );
};
detail.title = '博客详情';
detail.wrappers = ['@/wrappers/auth'];
export default detail;
