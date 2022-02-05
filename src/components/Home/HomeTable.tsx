import React from 'react';
import { Table ,TableColumnsType } from 'antd';
type IProps = {
  data: Array<any>;
};
const HomeTable = (props: IProps) => {
  const columns = [
    {
      title:'标题',
      dataIndex:'title',
      align:'center',
    },
    {
      title:'分类',
      dataIndex:['category','name'],
      align:'center',
    },
    {
      title:'访问量',
      dataIndex:'scanNumber',
      align:'center',
    },
    {
      title:'评论数',
      dataIndex:'commentNumber',
      align:'center',
    },
  ] as TableColumnsType<any>;
  return <Table dataSource={props.data} size='small' columns={columns} rowKey={'id'} pagination={false}></Table>;
};

export default HomeTable;
