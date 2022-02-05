import { useEffect, useState } from 'react';
import { Row, Col, Card, message } from 'antd';
import './index.less';
import { Link } from 'umi';
import { getAllTotal } from '@/api/home';
import { getAllCategory } from '@/api/category';

import HomeChart from '@/components/Home/HomeChart';
import HomeTable from '@/components/Home/HomeTable';
import { getBlog } from '@/api/blog';

function IndexPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [blogTotal, setBlogTotal] = useState<number>(0); //博客总数
  const [categoryTotal, setCategoryTotal] = useState<number>(0); //博客分类总数
  const [projectTotal, setProjectTotal] = useState<number>(0); //项目总数
  const [messageTotal, setMessageTotal] = useState<number>(0); //留言总数
  const [categoryData, setCategoryData] = useState<any>(); //分类数据
  const [blogData, setBlogData] = useState<any>(); //分类数据

  const fetchData = async () => {
    setIsLoading(true);
    const result = await Promise.all([getAllTotal(), getAllCategory()]); //获取所有数据
    const allResult = result[0];
    const categoryResult = result[1];

    if (allResult.code === 0 && allResult.data) {
      setBlogTotal(allResult.data.blogTotal as number);
      setCategoryTotal(allResult.data.categoryTotal as number);
      setProjectTotal(allResult.data.projectTotal as number);
      setMessageTotal(allResult.data.messageTotal as number);
    } else {
      message.error(allResult.msg);
    }

    if (categoryResult.code === 0 && categoryResult.data) {
      setCategoryData(categoryResult);
    } else {
      message.error(categoryResult.msg);
    }

    const blogResult = await getBlog(1, allResult.data?.blogTotal);
    if (blogResult.code === 0 && blogResult.data) {
      const result = blogResult.data.rows.sort((a: any, b: any) => b.scanNumber - a.scanNumber).slice(0,5);
      setBlogData(result);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  return (
    <div className="home-container" style={{ width: '100%' }}>
      <Row className="home-head" gutter={16} justify="center">
        <Col className="home-card" span={12} lg={{ span: 6 }}>
          <Card
            title="博客"
            extra={<Link to={'/blog/list'}>详情</Link>}
            hoverable
            loading={isLoading}
          >
            共有<span className="home-card-number">{blogTotal}</span>篇博客
          </Card>
        </Col>
        <Col className="home-card" span={12} lg={{ span: 6 }}>
          <Card
            title="博客分类"
            extra={<Link to={'/category/list'}>详情</Link>}
            hoverable
            loading={isLoading}
          >
            共有<span className="home-card-number">{categoryTotal}</span>
            个博客分类
          </Card>
        </Col>
        <Col className="home-card" span={12} lg={{ span: 6 }}>
          <Card
            title="项目&效果"
            extra={<Link to={'/project/list'}>详情</Link>}
            hoverable
            loading={isLoading}
          >
            共有<span className="home-card-number">{projectTotal}</span>
            个项目&效果
          </Card>
        </Col>
        <Col className="home-card" span={12} lg={{ span: 6 }}>
          <Card
            title="留言"
            extra={<Link to={'/message/list'}>详情</Link>}
            hoverable
            loading={isLoading}
          >
            共有<span className="home-card-number">{messageTotal}</span>条留言
          </Card>
        </Col>
      </Row>
      <Row className="home-content" gutter={16}>
        <Col span={24} lg={{ span: 12 }} style={{ height: 400 }}>
          <Card
            style={{ height: '100%' }}
            title="访问量前五的博客"
            extra={<Link to={'/blog/list'}>详情</Link>}
            loading={isLoading}
          >
            <HomeTable data={blogData} />
          </Card>
        </Col>
        <Col span={24} lg={{ span: 12 }} style={{ height: 400 }}>
          <Card
            style={{ height: '100%' }}
            title="博客分类对应的博客数量占比"
            extra={<Link to={'/category/list'}>详情</Link>}
            loading={isLoading}
          >
            <HomeChart data={categoryData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

IndexPage.title = '首页';
export default IndexPage;
