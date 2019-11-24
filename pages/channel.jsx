import React, { useContext } from 'react';
import {
  Layout,
  Affix,
  Button,
  Col,
  Descriptions,
  Icon,
  PageHeader,
  Row,
  Statistic,
  Input,
  Form,
} from 'antd';

import axioswal from 'axioswal';
import MyComment from '../components/MyComment';

import PageLayout from '../components/pagelayout';
import { ChannelContext, ChannelContextProvider } from '../components/ChannelContext';

const { Content } = Layout;

const ChatHeader = () => (
  <Affix>
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="Channel Name"
      subTitle="Kevin Redman"
      extra={[
        <Button key="2">View members</Button>,
        <Button key="3">Leave channel</Button>,
      ]}
    >
      <Descriptions size="small" column={3}>
        <Descriptions.Item>
          <Statistic title="Active Users" value={152} />
        </Descriptions.Item>
        <Descriptions.Item>
          <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<Icon type="arrow-up" />}
            suffix="%"
          />
        </Descriptions.Item>
        <Descriptions.Item>
          <Statistic title="Away vs Here" value={93} suffix="/ 100" />
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  </Affix>
);

const MessagesList = (props) => {
  const { state: { messages } } = useContext(ChannelContext);
  return (
    <Row gutter={[40, 40]}>
      <Col span={24}>
        {messages && messages.map((message) => <MyComment key={message._id} message={message} />)}
      </Col>
    </Row>
  );
}

const MessageActions = Form.create({ name: 'send_message' })((props) => {
  const { form } = props;
  const { getFieldDecorator } = form;
  const { dispatch } = useContext(ChannelContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    form.validateFields((err, values) => {
      const { body } = values;
      if (!err) {
        axioswal
          .post('/api/messages', {
            body,
          })
          .then((data) => {
            if (data.status === 'ok') {
            //  Fetch the user data for the Channel context here
              dispatch({ type: 'fetch' });
            }
          });
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row gutter={[20, 20]}>
        <Col span={16}>
          <Form.Item>
            {getFieldDecorator('body', {
              rules: [{
                required: true,
                message: 'Please enter some text!',
              }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Start typing here"
              />,
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item>
            <Button block htmlType="submit">Submit</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});

const ChannelPage = (props) => {
  return (
    <PageLayout>
      <ChatHeader />
      <Content style={{ marginTop: 40, padding: '0 50px' }}>
        <div style={{
          background: '#fff',
          padding: 24,
          minHeight: 280,
        }}
        >
          <ChannelContextProvider>
            <MessagesList />
            <MessageActions />
          </ChannelContextProvider>
        </div>
      </Content>
    </PageLayout>
  );
};

export default ChannelPage;
