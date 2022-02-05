import React from 'react';
import { Table, TableColumnsType,message } from 'antd';
import getDate from '@/utils/getDate';
import OperButton from '@/components/OperButton';
import { deleteProject } from '@/api/project';
type IProps = {
  data: Array<any>;
  isLoading: boolean;
  onDeleteSuccess:()=>void
};

const ProjectTable = (props: IProps) => {
  // 删除按钮的点击事件
  const onDelete = async (id: number) => {
    const res = await deleteProject(id);
    if(res.code === 0){
      message.success(res.msg);
      props.onDeleteSuccess();
    }else{
      message.error(res.msg)
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
      title: '项目/效果名称',
      dataIndex: 'name',
      width: 100,
      align: 'center',
    },
    {
      title: '描述',
      dataIndex: 'description',
      width: 300,
      align: 'center',
    },
    {
      title: '访问地址',
      dataIndex: 'url',
      width: 100,
      align: 'center',
    },
    {
      title: 'github地址',
      dataIndex: 'github',
      width: 100,
      align: 'center',
    },
    {
      title: '展示顺序',
      dataIndex: 'order',
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
        return <OperButton id={row.id} link="project" onDelete={onDelete} />;
      },
    },
  ] as TableColumnsType<any>;
  return (
    <Table
      className="project-table"
      dataSource={props.data}
      rowKey={'id'}
      columns={columns}
      loading={props.isLoading}
      pagination={false}
      bordered
    ></Table>
  );
};
 
export default ProjectTable;
