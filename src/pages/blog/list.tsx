import { getBlog } from '@/api/blog';
import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import BlogTable from './components/BlogTable';
import BlogSearchBar from './components/BlogSearchBar';
import { getAllCategory } from '@/api/category';
const list = () => {
  const [blogQuery, setBlogQuery] = useState({
    page: 1,
    limit: 10,
    cate: -1,
    title: '',
  });
  const [total, setTotal] = useState<number>(0); //博客总数
  const [tableData, setTableData] = useState<Array<any>>([]); //博客列表数据
  const [categoryList, setCategoryList] = useState<Array<any>>([]); //全部类目 数据
  const [isLoading, setIsLoading] = useState<boolean>(true); //是否正在加载中
  const fetchData = async () => {
    setIsLoading(true);
    // 获取博客数据
    const blogData: any = await getBlog(
      blogQuery.page,
      blogQuery.limit,
      blogQuery.cate,
      blogQuery.title,
    );
    setIsLoading(false);

    setTableData(blogData.data.rows);
    setTotal(blogData.data.total);
    return ()=>{}
  };
  // 初始化blog数据
  useEffect(() => {
    fetchData();
    return ()=>{}
  }, [blogQuery]);
  // 获取分类数据
  useEffect(() => {
    getAllCategory().then((cateData: any) => {
      setCategoryList(cateData.data.rows);
    });
    return ()=>{}
  }, []);

  const onSelectChange = (value: number | string) => {
    setBlogQuery({
      ...blogQuery,
      cate: +value,
    });
  };
  // 查询事件
  const onSearch = (value: string) => {
    if (value === '' && blogQuery.cate === -1) {
      return;
    }
    setBlogQuery({
      ...blogQuery,
      title: value,
    });
  };
  // 清空查询框事件
  const onBack = () => {
    setBlogQuery({
      ...blogQuery,
      title: '',
    });
  };

  return (
    <div className='blog-list-container'>
      <BlogSearchBar
        categoryList={categoryList}
        onSelectChange={onSelectChange}
        onSearch={onSearch}
        onBack={onBack}
      />
      <BlogTable
        data={tableData}
        isLoading={isLoading}
        onDeleteSuccess={() => {
          fetchData();
        }}
      />
      <Pagination
        style={{ margin: '10px 0', textAlign: 'right' }}
        current={blogQuery.page}
        pageSize={blogQuery.limit}
        total={total}
        onChange={(newPage:number)=>{setBlogQuery({
          ...blogQuery,
          page:newPage
        })}}
      />
    </div>
  );
};

list.title = '博客列表';
list.wrappers = ['@/wrappers/auth', '@/wrappers/loading'];
export default list;
