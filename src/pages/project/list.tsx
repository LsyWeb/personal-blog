import { getProject } from '@/api/project';
import React, { useState,useEffect } from 'react'
import ProjectTable from './components/ProjectTable';
import SearchBar from '@/components/SearchBar';
const list = () => {
  const [projectList, setProjectList] = useState<Array<any>>([]);//项目列表
  const [isLoading, setIsLoading] = useState<boolean>(true);//项目列表
  const [projectQuery,setProjectQuery] = useState<any>({name:''});
  const fetchData = async ()=>{
    setIsLoading(true);
    const res = await getProject(projectQuery.name);
    if(res.data){
      setProjectList(res.data as any);
    }
    setIsLoading(false);
  }
  // 获取最新数据
  useEffect(() => {
    fetchData();
    return () => {};
  }, [projectQuery]);
  // 查询事件
  const onSearch = (value: string) => {
    if (value === '') {
      return;
    }
    setProjectQuery({
      ...projectQuery,
      name: value,
    });
  };
  // 清空查询框事件
  const onBack = () => {
    setProjectQuery({
      ...projectQuery,
      name: '',
    });
  };

  return (
    <div className='project-list-container'>
      <SearchBar
        onSearch={onSearch}
        onBack={onBack}
        searchKey="项目名称"
        addLink="/project/add"
        addText="新增项目"
      />
     <ProjectTable data={projectList} isLoading={isLoading} onDeleteSuccess={()=>{
       fetchData();
     }} />
    </div>
  )
}

list.title = '项目列表';
list.wrappers = ['@/wrappers/auth'];
export default list;
