import axios from './request';
import { dataType } from '../types/apiDataType';
import { projectFormDataType } from '@/types/projectFormDataType';
/**
 * 分页获取 项目&效果 数据
 * @param name 项目名称
 * @returns 
 */
export async function getProject(
  name: string = '',
): Promise<any> {
  return await axios.get('/api/project', {
    params: {
      name,
    },
  });
}

/**
 * 根据id获取 项目&效果 详情
 * @param id 项目id
 * @returns 
 */
export async function getProjectById(id: number): Promise<dataType> {
  return await axios.get(`/api/project/${id}`);
}

/**
 * 新增 项目&效果 
 * @param projectData 项目的所有字段 数据
 * @returns 
 */
 export async function addProject(projectData:projectFormDataType): Promise<dataType> {
  return await axios.post(`/api/project`,projectData);
}

/**
 * 修改 项目&效果 
 * @param id 修改的项目的id
 * @param projectData 项目的所有字段 数据
 * @returns 
 */
 export async function editProject(id:number,projectData:projectFormDataType): Promise<dataType> {
  return await axios.put(`/api/project/${id}`,projectData);
}

/**
 * 删除 项目&效果 
 * @param id 项目的id
 * @returns 
 */
 export async function deleteProject(id:number): Promise<dataType> {
  return await axios.delete(`/api/project/${id}`);
}