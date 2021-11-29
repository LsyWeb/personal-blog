import request from './request'

// 根据项目名称模糊查询项目
export async function getProject(name = ''){
    return await request.get('/api/project',{
        params:{
            name
        }
    });
}

// 根据项目id查询项目
export async function getProjectById(projectId){
    return await request.get(`/api/project/${projectId}`);
}

// 新增项目
export async function addProject(projectObj){
    return await request.post(`/api/project`,projectObj);
}

// 根据项目id修改项目
export async function updateProject(projectId,projectObj){
    return await request.put(`/api/project/${projectId}`,projectObj);
}

// 根据项目id删除项目
export async function deleteProject(projectId){
    return await request.delete(`/api/project/${projectId}`);
}