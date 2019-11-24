import React, { useContext } from 'react';
import Head from 'next/head';
import axioswal from 'axioswal';
import { Layout } from 'antd';
import { UserContext } from './UserContext';
import 'antd/dist/antd.css';
import Navbar from './Navbar';

const { Footer } = Layout;

export default ({ children }) => {
  const { dispatch } = useContext(UserContext);
  const handleLogout = (event) => {
    axioswal
      .delete('/api/session')
      .then((data) => {
        if (data.status === 'ok') {
          dispatch({ type: 'clear' });
        }
      });
  };
  return (
    <Layout className="layout">
      <Head>
        <title>Next.js + MongoDB App</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="nextjs-mongodb-app is a continously developed app built with Next.JS and MongoDB. This project goes further and attempts to integrate top features as seen in real-life apps."
        />
        <meta property="og:title" content="Next.js + MongoDB App" />
        <meta
          property="og:description"
          content="nextjs-mongodb-app is a continously developed app built with Next.JS and MongoDB. This project goes further and attempts to integrate top features as seen in real-life apps."
        />
        <meta
          property="og:image"
          content="https://repository-images.githubusercontent.com/201392697/5d392300-eef3-11e9-8e20-53310193fbfd"
        />
      </Head>
      <Navbar
        handleLogout={handleLogout}
      />

      {children}
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
};
