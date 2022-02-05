import React from 'react';
import {history} from 'umi'
import {Button,Popconfirm,message} from 'antd'
import styles from './index.less'
type IProps = {
  id:number,
  link:string,
  onDelete:(id:number)=>void
}
const OperButton = (props:IProps) => {
  const confirm = async ()=>{
    await props.onDelete(props.id);
    message.success('删除成功');
  }
  return (
    <div className={styles['oper-button']}>
    <Button type="primary" size='small' style={{ marginRight: 10 }} onClick={()=>{
      history.push(`/${props.link}/detail/${props.id}`)
    }}>
      编辑
    </Button>
    <Popconfirm
      placement='left'
      cancelText="取消"
      okText="确定"
      title={`确定要删除id为${props.id}的这行数据吗`}
      onConfirm={confirm}
      onCancel={()=>{
        message.warn('取消删除')
      }}
    >
      <Button type="default" size='small' danger>删除</Button>
    </Popconfirm>
  </div>);
};

export default OperButton;
