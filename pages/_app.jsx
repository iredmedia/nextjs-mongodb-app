import React from 'react';
import App from 'next/app';
import { UserContextProvider } from '../components/UserContext';
import { ChannelContextProvider } from '../components/ChannelContext';

class MyApp extends App {
  render() {
    console.log('render');
    const { Component, pageProps } = this.props;
    return (
      <UserContextProvider>
        <ChannelContextProvider>
          <Component {...pageProps} />
        </ChannelContextProvider>
      </UserContextProvider>
    );
  }
}

export default MyApp;
