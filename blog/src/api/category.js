import request from './request';

// 分页获取博客分类数据
export async function getCategory(page = 1, limit = 10, name = '') {
  return await request.get('/api/category',{
    params:{
      page,
      limit,
      name
    }
  })
}

// 根据id查询分类
export async function getCategoryById(id) {
  return await request.get(`/api/category/${id}`)
}

// 新增分类
export async function addCategory(categoryObj) {
  return await request.post('/api/category',categoryObj)
}


// 根据id删除分类
export async function deleteCategory(id) {
  return await request.delete(`/api/category/${id}`)
}

// 编辑分类
export async function updateCategory(id,categoryObj) {
  return await request.put(`/api/category/${id}`,categoryObj)
}