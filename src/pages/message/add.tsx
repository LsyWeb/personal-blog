import { messageFormDataType } from '@/types/messageFormDataType';
import React from 'react'
import {message} from 'antd'
import MessageForm from './components/MessageForm';
import { addMessage } from '@/api/message';
import { history } from 'umi';

const add = () => {
  const onSubmit = async (formData:messageFormDataType)=>{
    const res = await addMessage(formData);
    if(res.code === 0){
      message.success(res.msg);
      history.push('/message/list')
    }
    else{
      message.error(res.msg);
    }
  }
  return (
    <div className='message-add-container' style={{width:500,margin:'0 auto'}}>
      <MessageForm onSubmit={onSubmit} />
    </div>
  )
}

add.title = '新增留言';
add.wrappers = ['@/wrappers/auth'];
export default add
