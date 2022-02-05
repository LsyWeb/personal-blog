import axios from './request';
import { dataType } from '../types/apiDataType';
import { messageFormDataType } from '@/types/messageFormDataType';
/**
 * 分页获取 留言 数据
 * @param name 留言名称
 * @returns 
 */
export async function getMessage(
  page:number = 1,
  limit:number = 10,
  key: string = '',
): Promise<dataType> {
  return await axios.get('/api/message', {
    params: {
      page,
      limit,
      key,
    },
  });
}

/**
 * 根据id获取 留言 详情
 * @param id 留言id
 * @returns 
 */
export async function getMessageById(id: number): Promise<dataType> {
  return await axios.get(`/api/message/${id}`);
}

/**
 * 新增 留言 
 * @param messageData 留言的所有字段 数据
 * @returns 
 */
 export async function addMessage(messageData:messageFormDataType): Promise<dataType> {
  return await axios.post(`/api/message`,messageData);
}

/**
 * 修改 留言 
 * @param id 修改的留言的id
 * @param messageData 留言的所有字段 数据
 * @returns 
 */
 export async function editMessage(id:number,messageData:messageFormDataType): Promise<dataType> {
  return await axios.put(`/api/message/${id}`,messageData);
}

/**
 * 删除 留言 
 * @param id 留言的id
 * @returns 
 */
 export async function deleteMessage(id:number): Promise<dataType> {
  return await axios.delete(`/api/message/${id}`);
}