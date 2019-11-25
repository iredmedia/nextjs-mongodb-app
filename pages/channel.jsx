import React, { useContext, useEffect } from 'react';
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

import PubNub from 'pubnub';

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

  const handleSubmit = (event) => {
    event.preventDefault();

    form.validateFields((err, values) => {
      const { body } = values;
      if (!err) {
        const pubnub = new PubNub({
          publishKey: process.env.PUBNUB_PUB_KEY,
          subscribeKey: process.env.PUBNUB_SUB_KEY,
        });

        pubnub.publish({
          message: data.ops[0],
          channel: 'channel-1',
        }, (status, response) => console.log(status, response));
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
  const { dispatch } = useContext(ChannelContext);

  // When the component initializes, subscribe to the 'messages' channel
  // to get new messages.
  const pubnub = new PubNub({
    subscribeKey: 'sub-c-97569a56-0e9f-11ea-9d7d-1a72d7432d4b', // This is safe to pub but should live elsewhere
  });

  useEffect(() => {
    console.log('ran');
    pubnub.subscribe({
      channels: ['channel-1'],
    });

    pubnub.addListener({
      message: ({ message }) => {
        console.log('message!');
        dispatch({
          type: 'update',
          data: message,
        });
      },
    });
  }, []);

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
          <MessagesList />
          <MessageActions />
        </div>
      </Content>
    </PageLayout>
  );
};

export default ChannelPage;
