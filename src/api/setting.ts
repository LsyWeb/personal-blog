import axios from './request';
import { dataType } from '../types/apiDataType';
import { settingFormDataType } from '@/types/settingFormDataType';

/**
 * 获取 全局设置 数据
 * @param name 全局设置名称
 * @returns 
 */
export async function getSetting(): Promise<dataType> {
  return await axios.get('/api/setting');
}

/**
 * 修改 全局设置 
 * @param id 修改的全局设置的id
 * @param settingData 全局设置的所有字段 数据
 * @returns 
 */
 export async function editSetting(id:number,settingData:settingFormDataType): Promise<dataType> {
  return await axios.put(`/api/setting/${id}`,settingData);
}

/**
 * 删除 全局设置 
 * @param id 全局设置的id
 * @returns 
 */
 export async function deleteSetting(id:number): Promise<dataType> {
  return await axios.delete(`/api/setting/${id}`);
}