import React, { useContext } from 'react';
import {
  Layout,
  Affix,
  Breadcrumb,
  Button,
  Col,
  Collapse,
  Descriptions,
  Icon,
  PageHeader,
  Row,
  Steps,
} from 'antd';

import MyCard from '../components/MyCard';
import MyComment from '../components/MyComment';

import { UserContext } from '../components/UserContext';
import PageLayout from '../components/pagelayout';

const { Content } = Layout;

const IndexPage = () => {
  const { state: { isLoggedIn, user: { name } } } = useContext(UserContext);
  if (!isLoggedIn) {
    return (
      <PageLayout>
        <h2 style={{ textAlign: 'center', margin: '50px 0' }}>
          Login to get started!
        </h2>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Affix>
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title="3911 Carolynn Crt, Vineland On"
          subTitle="Kevin Redman"
          extra={[
            <Button key="3">Operation</Button>,
            <Button key="2">Operation</Button>,
            <Button key="1" type="primary">
              Primary
            </Button>,
          ]}
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Created">(905) 562-3027</Descriptions.Item>
            <Descriptions.Item label="Material">
              <a>Asphalt</a>
            </Descriptions.Item>
            <Descriptions.Item label="Estimate">$19,000</Descriptions.Item>
            <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
            <Descriptions.Item label="Remarks">
              Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </Affix>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{
          background: '#fff',
          padding: 24,
          minHeight: 280,
        }}
        >
          <Steps style={{ marginBottom: 20 }}>
            <Steps.Step status="finish" title="Login" icon={<Icon type="user" />} />
            <Steps.Step status="finish" title="Verification" icon={<Icon type="solution" />} />
            <Steps.Step status="process" title="Pay" icon={<Icon type="loading" />} />
            <Steps.Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
          </Steps>
          <h1>Quotes</h1>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <MyCard />
            </Col>
            <Col span={8}>
              <MyCard />
            </Col>
            <Col span={8}>
              <MyCard />
            </Col>
          </Row>

          <Row gutter={[40, 40]}>
            <Col span={12}>
              <h2>Comments</h2>
              <MyComment />
              <MyComment />
              <MyComment />
              <MyComment />
            </Col>
            <Col span={12}>
              <h2>Quotes</h2>
              <Row gutter={[40, 40]}>
                <Col span={24}>
                  <MyCard />
                </Col>
                <Col span={24}>
                  <MyCard />
                </Col>
                <Col span={24}>
                  <MyCard />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[40, 40]}>
            <Col span={12}>
              <h2>Settings</h2>
              <Collapse
                defaultActiveKey={['1']}
                onChange={e => console.log(e)}
                expandIconPosition="right"
              >
                <Collapse.Panel
                  header="This is panel header 1"
                  key="1"
                  extra={<Icon type="setting" />}
                >
                  <div>Some Text</div>
                </Collapse.Panel>
                <Collapse.Panel
                  header="This is panel header 2"
                  key="2"
                  extra={<Icon type="setting" />}
                >
                  <div>Some Text</div>
                </Collapse.Panel>
                <Collapse.Panel
                  header="This is panel header 3"
                  key="3"
                  extra={<Icon type="setting" />}
                >
                  <div>Some Text</div>
                </Collapse.Panel>
              </Collapse>
            </Col>
            <Col span={12}>
              <h2>Comments</h2>
              <MyComment />
              <MyComment />
              <MyComment />
              <MyComment />
            </Col>
          </Row>
        </div>
      </Content>
    </PageLayout>
  );
};

export default IndexPage;
