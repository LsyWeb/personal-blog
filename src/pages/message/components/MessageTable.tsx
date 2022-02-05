import React from 'react';
import { Table, TableColumnsType,message } from 'antd';
import getDate from '@/utils/getDate';
import OperButton from '@/components/OperButton';
import { deleteMessage } from '@/api/message';
type IProps = {
  data: Array<any>;
  isLoading: boolean;
  onDeleteSuccess:()=>void
};

const MessageTable = (props: IProps) => {
  // 删除按钮的点击事件
  const onDelete = async (id: number) => {
    const res = await deleteMessage(id);
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
      title: '用户名',
      dataIndex: 'nickname',
      width: 100,
      align: 'center',
    },
    {
      title: '内容',
      dataIndex: 'content',
      width: 100,
      align: 'center',
    },
    {
      title: '头像路径',
      dataIndex: 'avatar',
      width: 100,
      align: 'center',
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
        return <OperButton id={row.id} link="message" onDelete={onDelete} />;
      },
    },
  ] as TableColumnsType<any>;
  return (
    <Table
      className="message-table"
      dataSource={props.data}
      rowKey={'id'}
      columns={columns}
      loading={props.isLoading}
      pagination={false}
      bordered
    ></Table>
  );
};

export default MessageTable;
