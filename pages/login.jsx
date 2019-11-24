import React, { useContext } from 'react';
import axioswal from 'axioswal';
import Link from 'next/link';
import {
  Layout, Form, Icon, Input, Button, Checkbox,
} from 'antd';
import { UserContext } from '../components/UserContext';
import PageLayout from '../components/pagelayout';
import redirectTo from '../lib/redirectTo';


const LoginPage = (props) => {
  const { dispatch } = useContext(UserContext);
  const { form } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = (event) => {
    event.preventDefault();
    props.form.validateFields((err, values) => {
      const { email, password} = values;
      if (!err) {
        axioswal
          .post('/api/authenticate', {
            email,
            password,
          })
          .then((data) => {
            if (data.status === 'ok') {
            //  Fetch the user data for UserContext here
              dispatch({ type: 'fetch' });
              redirectTo('/');
            }
          });
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
          .login-form-forgot {
            float: right;
          }
          .login-form-button {
            width: 100%;
          }
        `}
      </style>
      <Layout.Content>
        <div className="login-form">
          <Form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{
                  required: true,
                  message: 'Please input your email!',
                }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
              <a className="login-form-forgot">
                Forgot password
              </a>
              <Button block type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or
              {' '}
              <Link href="/signup"><a>register now!</a></Link>
            </Form.Item>
          </Form>
        </div>
      </Layout.Content>
    </PageLayout>
  );
};

export default Form.create({ name: 'normal_login' })(LoginPage);
