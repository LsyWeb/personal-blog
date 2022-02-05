import React, { useState } from 'react';
import { Table, TableColumnsType, } from 'antd';
import OperButton from '@/components/OperButton'
import { deleteBlog } from '@/api/blog';
import getDate from '@/utils/getDate';
type IProps = {
  isLoading: boolean,
  data: Array<any>,
  onDeleteSuccess:()=>void
};
const BlogTable = (props: IProps) => {
  const onDelete = async (id:number)=>{
    await deleteBlog(id);
    props.onDeleteSuccess();
  }
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: '标题',
      dataIndex: 'title',
      align: 'center',
      width: 100,
    },
    {
      title: '描述',
      dataIndex: 'description',
      align: 'center',
    },

    {
      title: '分类',
      dataIndex: ['category', 'name'],
      align: 'center',
      width: 100,
    },
    {
      title: '访问量',
      dataIndex: 'scanNumber',
      align: 'center',
      width: 100,
      sorter: (a, b) => a.scanNumber - b.scanNumber,
    },
    {
      title: '评论数',
      dataIndex: 'commentNumber',
      align: 'center',
      width: 100,
      sorter: (a, b) => a.commentNumber - b.commentNumber,
    },
    {
      title: '日期',
      dataIndex: 'createdAt',
      align: 'center',
      width: 200,
      render(text){
        return <>{getDate(text)}</>
      }
    },
    {
      title: '操作',
      align: 'center',
      width: 100,
      render: (text,row) => {
        return (
          <OperButton id={row.id} link='blog' onDelete={onDelete} />
        );
      },
    },
  ] as TableColumnsType<any>;
  return (
    <Table
      className="blog-table"
      dataSource={props.data}
      rowKey={'id'}
      columns={columns}
      loading={props.isLoading}
      pagination={false}
      bordered
    ></Table>
  );
};

export default BlogTable;
