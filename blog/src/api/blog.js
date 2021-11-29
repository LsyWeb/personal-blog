import request from './request';

// 获取博客列表数据
export async function getBlogs(page = 1, limit = 10, categoryid = -1,searchValue = '') {
    return await request.get('/api/blog', {
        params: {
            page,
            limit,
            cate:categoryid,
            title:searchValue
        }
    });
}



// 获取单个博客数据
export async function getBlog(id) {
    return await request.get(`/api/blog/${id}`)
}

// 新增博客
export async function addBlog(newBlog) {
    return await request.post(`/api/blog`,newBlog)
}

// 修改博客信息
export async function updateBlog(id,newBlog) {
    return await request.put(`/api/blog/${id}`,newBlog)
}

// 删除博客
export async function deleteBlog(id) {
    return await request.delete(`/api/blog/${id}`)
}

// 提交评论数据
export async function postComment(body) {
    return await request.post('/api/comment', body)
}

// 分页获取评论数据
export async function getComments(page = 1, limit = 10, blogId) {
    return await request.get('/api/comment', {
        params: {
            blogId,
            page,
            limit
        }
    })
}


// 获取博客分类数据
export async function getBlogCategory() {
    return await request.get('/api/category')
}