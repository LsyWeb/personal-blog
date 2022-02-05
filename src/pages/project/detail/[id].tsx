import { editProject, getProjectById } from '@/api/project';
import { projectFormDataType } from '@/types/projectFormDataType';
import React,{useState,useEffect} from 'react'
import { useParams } from 'umi';
import { Spin ,message} from 'antd';
import ProjectForm from '../components/ProjectForm';

const edit = () => {
  const params: any = useParams();
  const [projectData, setProjectData] = useState<any>(null);
  const fetchData = async () => {
    const res = await getProjectById(params.id);
    setProjectData(res.data);
  };
  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  // 提交事件
  const onSubmit = async (formData: projectFormDataType) => {
    const res = await editProject(params.id,formData);
    if(res.code === 0){
      message.success(res.msg);
    }
    else{
      message.error(res.msg);
    }
  };
  return (
    <div className='project-detail-container' style={{width:500,margin:'0 auto'}}>
       {projectData ? (
        <ProjectForm defaultFormData={projectData} onSubmit={onSubmit} />
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

edit.title = '项目详情';
edit.wrappers = ['@/wrappers/auth'];
export default edit;
