import React from 'react';
import { Table, TableColumnsType,message } from 'antd';
import getDate from '@/utils/getDate';
import OperButton from '@/components/OperButton';
import { deleteCategory } from '@/api/category';
type IProps = {
  data: Array<any>;
  isLoading: boolean;
  onDeleteSuccess:()=>void
};

const CategoryTable = (props: IProps) => {
  // 删除按钮的点击事件
  const onDelete = async (id: number) => {
    const res = await deleteCategory(id);
    if(res.code === 0){
      message.success(res.msg);
      props.onDeleteSuccess();
    }else{
      message.error(res.msg);
    }
  };
  // 表格列的配置项
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 100,
      align: 'center',
    },
    ,
    {
      title: '名称',
      dataIndex: 'name',
      width: 100,
      align: 'center',
    },
    {
      title: '博客数量',
      dataIndex: 'blogNumber',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.blogNumber - b.blogNumber,
    },
    {
      title: '创建时间',
      width: 150,
      align: 'center',
      render(row: any) {
        return getDate(row.createdAt);
      },
    },
    {
      title: '操作',
      align: 'center',
      width: 100,
      render(text: any, row: any) {
        return <OperButton id={row.id} link="category" onDelete={onDelete} />;
      },
    },
  ] as TableColumnsType<any>;
  return (
    <Table
      className="category-table"
      dataSource={props.data}
      rowKey={'id'}
      columns={columns}
      loading={props.isLoading}
      pagination={false}
      bordered
    ></Table>
  );
};

export default CategoryTable;
