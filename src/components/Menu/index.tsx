import React from 'react';
import { Menu } from 'antd';
import {  NavLink } from 'umi';


const MyMenu: React.FC = (props:any) => {
  const menuConfig = [
    {
      key: '/',
      title: '首页',
    },
    {
      key: '/blog',
      title: '博客',
      children: [
        {
          key: '/blog/list',
          title: '博客列表',
        },
        {
          key: '/blog/add',
          title: '新增博客',
        },
      ],
    },
    {
      key: '/category',
      title: '分类',
      children: [
        {
          key: '/category/list',
          title: '分类列表',
        },
        {
          key: '/category/add',
          title: '新增分类',
        },
      ],
    },
    {
      key: '/project',
      title: '项目&效果',
      children: [
        {
          key: '/project/list',
          title: '项目列表',
        },
        {
          key: '/project/add',
          title: '新增项目',
        },
      ],
    },
    {
      key: '/message',
      title: '留言',
      children: [
        {
          key: '/message/list',
          title: '留言列表',
        },
        {
          key: '/message/add',
          title: '新增留言',
        },
      ],
    },
    {
      key: '/setting',
      title: '全局设置',
      
    }
  ];
  const menus = menuConfig.map((item) => {
    if (item.children) {
      const subMenu = item.children.map((it) => (
        <Menu.Item
          key={it.key}
          children={
            <NavLink to={it.key} exact>
              {it.title}
            </NavLink>
          }
        />
      ));
      return (
        <Menu.SubMenu title={item.title} key={item.key} children={subMenu} />
      );
    } else {
      return (
        <Menu.Item
          key={item.key}
          children={
            <NavLink to={item.key} exact>
              {item.title}
            </NavLink>
          }
        />
      );
    }
  });
  const defaultOpenKey = '/' + props.location.pathname.split('/')[1]; //默认打开的菜单项
  return (
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={[defaultOpenKey]}
        selectedKeys={[props.location.pathname]}
      >
        {menus}
      </Menu>
  );
};

export default MyMenu;
