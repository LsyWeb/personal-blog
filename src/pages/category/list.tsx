import React, { useEffect, useState } from 'react';
import { Pagination  } from 'antd';
import SearchBar from '@/components/SearchBar';
import { getCategory } from '@/api/category';
import CategoryTable from './components/CategoryTable';
const category = () => {
  const [categoryQuery, setCategoryQuery] = useState<{
    page: number;
    limit: number;
    name: string;
  }>({
    page: 1,
    limit: 10,
    name: '',
  }); //分类查找配置
  const [categoryList, setCategoryList] = useState<Array<any>>([]); //分类列表数据
  const [total, setTotal] = useState<number>(0); //分类列表总数
  const [isLoading, setIsLoading] = useState<boolean>(true); //是否正在加载中

  // 分页获取最新数据
  const fetchData = async () => {
    setIsLoading(true);
    const resp = await getCategory(
      categoryQuery.page,
      categoryQuery.limit,
      categoryQuery.name,
    );
    if (resp.data) {
      setCategoryList(resp.data.rows);
      setTotal(resp.data.total);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
    return () => {};
  }, [categoryQuery]);
  // 查询事件
  const onSearch = (value: string) => {
    if (value === '') {
      return;
    }
    setCategoryQuery({
      ...categoryQuery,
      name: value,
    });
  };
  // 清空查询框事件
  const onBack = () => {
    setCategoryQuery({
      ...categoryQuery,
      name: '',
    });
  };

  return (
    <div className="category-list-container">
      <SearchBar
        onSearch={onSearch}
        onBack={onBack}
        searchKey="分类名称"
        addLink="/category/add"
        addText="新增分类"
      />
      <CategoryTable data={categoryList} isLoading={isLoading}  onDeleteSuccess={()=>{
        fetchData();
      }} />
      <Pagination
        style={{ margin: '10px 0', textAlign: 'right' }}
        current={categoryQuery.page}
        pageSize={categoryQuery.limit}
        total={total}
        onChange={(newPage: number, pageSize: number) => {
          setCategoryQuery({
            ...categoryQuery,
            page: newPage,
            limit: pageSize,
          });
        }}
      />
    </div>
  );
};
category.title = '分类';
category.wrappers = ['@/wrappers/auth'];
export default category;
