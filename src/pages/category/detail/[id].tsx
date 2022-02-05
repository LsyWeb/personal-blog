import { editCategory, getCategoryById } from '@/api/category';
import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import { Spin ,message} from 'antd';
import CategoryForm from '../components/CategoryForm';

const detail = (props: any) => {
  const params: any = useParams();
  const [categoryData, setCategoryData] = useState<any>(null);
  const fetchData = async () => {
    const res = await getCategoryById(params.id);
    setCategoryData(res.data);
  };
  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const onSubmit = async (formData: {name:string}) => {
    const res = await editCategory(params.id,formData);
    if(res.code === 0){
      message.success(res.msg);
    }
    else{
      message.error(res.msg);
    }
  };

  return (
    <div className="category-detail-container" style={{width:500,margin:'0 auto'}}>
      {categoryData ? (
        <CategoryForm defaultFormData={categoryData} onSubmit={onSubmit} />
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
detail.title = '分类详情';
detail.wrappers = ['@/wrappers/auth'];
export default detail;
