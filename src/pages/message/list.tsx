import { getMessage } from '@/api/message';
import React,{useState,useEffect} from 'react'
import {Pagination,message} from 'antd'
import MessageTable from './components/MessageTable';
import SearchBar from '@/components/SearchBar';

const list = () => {
  const [messageList, setMessageList] = useState<Array<any>>([]);//留言列表
  const [total, setTotal] = useState<number>(0);//留言总数
  const [isLoading, setIsLoading] = useState<boolean>(true);//列表是否显示 loading
  const [messageQuery,setMessageQuery] = useState<any>({
    page:1,
    limit:10,
    key:''
  });//留言查询信息
  // 获取最新数据
  const fetchData = async ()=>{
    setIsLoading(true);
    const res = await getMessage(messageQuery.page,messageQuery.limit,messageQuery.key);
    if(res.code === 0 && res.data){
      setMessageList(res.data.rows);
      setTotal(res.data.total);
    }else{
      message.error('获取数据失败');
    }
    setIsLoading(false);
  }
  // 副作用操作
  useEffect(() => {
    fetchData();
    return () => {};
  }, [messageQuery]);

  // 查询事件
  const onSearch = (value: string) => {
    if (value === '') {
      return;
    }
    setMessageQuery({
      ...messageQuery,
      key: value,
    });
  };
  // 清空查询框事件
  const onBack = () => {
    setMessageQuery({
      ...messageQuery,
      key: '',
    });
  };
  return (
    <div className='message-list-container'>
      <SearchBar
        onSearch={onSearch}
        onBack={onBack}
        searchKey="用户名"
        addLink="/message/add"
        addText="新增留言"
      />
      <MessageTable data={messageList} isLoading={isLoading} onDeleteSuccess={()=>{
        fetchData();
      }}/>
      <Pagination
        style={{ margin: '10px 0', textAlign: 'right' }}
        current={messageQuery.page}
        pageSize={messageQuery.limit}
        total={total}
        onChange={(newPage: number, pageSize: number) => {
          setMessageQuery({
            ...messageQuery,
            page: newPage,
            limit: pageSize,
          });
        }}
        
      />
    </div>
  )
}

list.title = '留言列表';
list.wrappers = ['@/wrappers/auth'];
export default list
