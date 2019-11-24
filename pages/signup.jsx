import React, { useContext } from 'react';
import axioswal from 'axioswal';
import {
  Button, Checkbox, Form, Icon, Input, Layout,
} from 'antd';
import Link from 'next/link';
import { UserContext } from '../components/UserContext';
import PageLayout from '../components/pagelayout';
import redirectTo from '../lib/redirectTo';

const SignupPage = (props) => {
  const { dispatch } = useContext(UserContext);
  const { form } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = (event) => {
    event.preventDefault();
    axioswal
      .post('/api/users', {
        // name,
        // email,
        // password,
      })
      .then((data) => {
        if (data.status === 'ok') {
          dispatch({ type: 'fetch' });
          redirectTo('/');
        }
      });
  };

  return (
    <PageLayout>
      <style jsx>
        {`
          .login-form {
            max-width: 300px;
            width: 380px;
            margin: 40px auto;
          }
          .login-form-button {
            width: 100%;
          }
        `}
      </style>
      <Layout.Content>
        <div className="login-form">
          <Form onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{
                  required: true,
                  message: 'Please input your name!',
                }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Name"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{
                  required: true,
                  message: 'Please input your email!',
                }],
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: 'Please input your Password!',
                }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <Button block type="primary" htmlType="submit" className="login-form-button">
                Sign up
              </Button>
              Or
              {' '}
              <Link href="/login"><a>login now!</a></Link>
            </Form.Item>
          </Form>
        </div>
      </Layout.Content>
    </PageLayout>
  );
};

export default Form.create({ name: 'normal_login' })(SignupPage);
