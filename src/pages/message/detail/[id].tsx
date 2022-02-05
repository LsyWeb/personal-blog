import { editMessage, getMessageById } from '@/api/message';
import { messageFormDataType } from '@/types/messageFormDataType';
import React, { useEffect, useState } from 'react'
import { useParams } from 'umi';
import { Spin ,message} from 'antd';
import MessageForm from '../components/MessageForm';

const detail = () => {
  const params:any = useParams();
  const [messageData, setmessageData] = useState<any>();
  const fetchData = async () =>{
    const res = await getMessageById(params.id);
    if(res.data){
      setmessageData(res.data)
    }
  }
  useEffect(() => {
    fetchData();
    return () => {};
  }, []);
  
  const onSubmit = async (formData:messageFormDataType)=>{
    const res = await editMessage(params.id,formData);
    if(res.code === 0){
      message.success(res.msg);
    }
    else{
      message.error(res.msg);
    }
  }
  return (
    <div className='message-detail-container' style={{width:500,margin:'0 auto'}}>
     {messageData ? (
        <MessageForm defaultFormData={messageData} onSubmit={onSubmit} />
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
  )
}

detail.title = '留言详情';
detail.wrappers = ['@/wrappers/auth'];
export default detail
