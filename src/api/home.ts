
import { getBlog } from './blog';
import { getCategory } from './category';
import { getProject } from './project';
import { getMessage } from './message';
/**
 * 获取所有数据的 总数
 * 博客
 * 分类
 * 项目
 * 留言
 */
export async function getAllTotal() {
  const arr = [getBlog(), getCategory(), getProject(), getMessage()];
  const res = await Promise.all(arr);
  const blogData = res[0];
  const categoryData = res[1];
  const projectData = res[2];
  const messageData = res[3];

  if (
    blogData.code === 0 &&
    categoryData.code === 0 &&
    projectData.code === 0 &&
    messageData.code === 0
  ) {
    return {
      code: 0,
      msg: '获取数据成功',
      data: {
        blogTotal: blogData.data?.total,
        categoryTotal: categoryData.data?.total,
        projectTotal: projectData.data?.length,
        messageTotal: messageData.data?.total,
      },
    };
  } else {
    return {
      code: 1,
      msg: '获取数据失败',
      data:null
    };
  }
}
