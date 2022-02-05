import axios from './request';
import { dataType } from '../types/apiDataType';
import { blogFormDataType } from '@/types/blogFormDataType';
/**
 * 分页获取博客数据
 * @param page 页码
 * @param limit 每页显示多少条
 * @param cate 分类
 * @param title 标题
 * @returns 
 */
export async function getBlog(
  page: number = 1,
  limit: number = 10,
  cate: number = -1,
  title: string = '',
): Promise<dataType> {
  
  return await axios.get('/api/blog', {
    params: {
      page,
      limit,
      cate,
      title,
    },
  });
}

/**
 * 新增博客
 * @param formData 博客对象
 * @returns 
 */
export async function addBlog(formData : blogFormDataType ): Promise<dataType> {
  return await axios.post('/api/blog', formData);
}

/**
 * 修改博客
 * @param formData 博客对象
 * @returns 
 */
 export async function editBlog(id:number,formData : blogFormDataType ): Promise<dataType> {
  return await axios.put(`/api/blog/${id}`, formData);
}

/**
 * 删除博客
 * @param id 删除博客的id
 * @returns 
 */
export async function deleteBlog(id:number){
  return await axios.delete(`/api/blog/${id}`)
}

/**
 * 根据id获取博客详情
 * @param id 博客的id
 * @returns 
 */
 export async function getBlogById(id:number){
  return await axios.get(`/api/blog/${id}`)
}
