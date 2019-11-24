import {
  Layout, Menu,
} from 'antd';
import Link from 'next/link';
import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export default ({ handleLogout }) => {
  const { state: { isLoggedIn, user: { name } } } = useContext(UserContext);

  return (
    <Layout.Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{
          float: 'left',
          lineHeight: '64px',
        }}
      >
        <Menu.Item key="home"><Link href="/"><a>Home</a></Link></Menu.Item>
        <Menu.Item key="channels"><Link href="/channel"><a>Channels</a></Link></Menu.Item>
      </Menu>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{
          lineHeight: '64px',
          float: 'right',
        }}
      >
        {
          !isLoggedIn
          && <Menu.Item key="login"><Link href="/login"><a>Login</a></Link></Menu.Item>
        }
        {
          !isLoggedIn
          && <Menu.Item key="signup"><Link href="/signup"><a>Signup</a></Link></Menu.Item>
        }
        {
          isLoggedIn
          && ([
            <Menu.Item key={'welcome'}>Welcome {name}</Menu.Item>,
            <Menu.Item onClick={handleLogout} key="logout"><a>Logout</a></Menu.Item>,
          ])
        }
      </Menu>
    </Layout.Header>
  )
};
