import axios from './request';
import { dataType } from '../types/apiDataType';
import delay from '@/utils/delay';
/**
 * 分页获取博客分类数据
 * @param page 页码
 * @param limit 每页显示多少条
 * @param cate 分类
 * @param title 标题
 * @returns 
 */
export async function getCategory(
  page: number = 1,
  limit: number = 10,
  name: string = '',
): Promise<dataType> {
  await delay(1000);
  return await axios.get('/api/category', {
    params: {
      page,
      limit,
      name,
    },
  });
}

/**
 * 获取全部博客分类数据
 * @param page 页码
 * @param limit 每页显示多少条
 * @param cate 分类
 * @param title 标题
 * @returns 
 */
 export async function getAllCategory(): Promise<dataType> {
  const res = await axios.get('/api/category');
  return await axios.get('/api/category', {
    params: {
      page:1,
      limit:res.data.total
    },
  });
}

/**
 * 根据id获取单个分类信息
 * @param id 分类对象 { name:string }
 * @returns 
 */
 export async function getCategoryById(id:number):Promise<dataType> {
  return await axios.get(`/api/category/${id}`);
}


/**
 * 新增分类
 * @param categoryObj 分类对象 { name:string }
 * @returns 
 */
export async function addCategory(categoryObj:{name:string}):Promise<dataType> {
  return await axios.post('/api/category', categoryObj);
}


/**
 * 修改分类
 * @param id 分类对象 { name:string }
 * @returns 
 */
 export async function editCategory(id:number,formData:{name:string}):Promise<dataType> {
  return await axios.put(`/api/category/${id}`,formData);
}

/**
 * 删除分类
 * @param id 分类对象 { name:string }
 * @returns 
 */
 export async function deleteCategory(id:number):Promise<dataType> {
  return await axios.delete(`/api/category/${id}`);
}


