import React, { useState } from 'react';
import { Layout } from 'antd';
import { Location, History } from 'umi';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Bread from '@/components/Bread';
import styles from './index.less';

const { Sider, Content, Footer } = Layout;

type Props = {
  location: Location;
  history: History;
};

const Layouts: React.FC<Props> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  if (props.location.pathname === '/login') {
    return <div>{props.children}</div>;
  }
  return (
    <Layout style={{ height: '100%' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => {
          setCollapsed(!collapsed);
        }}
      >
        <h1 className={styles.title}>
          {collapsed ? '管理' : '个人博客后台管理'}
        </h1>
        <Menu {...props} />
      </Sider>
      <Layout
        className="layout-container"
        style={{
          boxSizing: 'border-box',
          overflow: 'auto',
        }}
      >
        <Header></Header>
        <div
          className="content"
          style={{
            padding: '24px 36px 0',
            flex: 'auto',
          }}
        >
          {props.location.pathname !== '/' && <Bread />}
          {props.children}
        </div>
        <Footer style={{ textAlign: 'center' }}>
          刘帅洋的个人博客后台管理
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Layouts;
