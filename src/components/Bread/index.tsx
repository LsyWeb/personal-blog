import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, Link, useStore } from 'umi';
const Bread: React.FC = (props: any) => {
  const breadcrumbNames = {
    '/':'首页',
    '/blog/list':'博客列表',
    '/blog/add':'新增博客',
    '/blog/detail':'博客详情',
    '/category/list':'分类列表',
    '/category/add':'新增分类',
    '/category/detail':'分类详情',
    '/project/list':'项目列表',
    '/project/add':'新增项目',
    '/project/detail':'项目详情',
    '/message/list':'留言列表',
    '/message/add':'新增留言',
    '/message/detail':'留言详情',
    '/setting':'全局设置'
  };
  const pathNames = useLocation().pathname.split('/').filter(item => item);
  const extraBreadcrumbItems = pathNames.map((path,index) => {
    const url = `/${pathNames.slice(0,index+1).join('/')}`;
    return (
      <Breadcrumb.Item key={url} href={url} >{breadcrumbNames[url]}</Breadcrumb.Item>
    )
  })
  const breadcrumbItems = [
    <Breadcrumb.Item key='home' href='/'>首页</Breadcrumb.Item>
  ].concat(extraBreadcrumbItems);

  return (<Breadcrumb style={{marginBottom:10}}  >{breadcrumbItems}</Breadcrumb>)
};

export default Bread;
