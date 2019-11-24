import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const ChannelContext = createContext();

const reducer = (state, action) => {
  console.log(action, state);
  switch (action.type) {
    case 'set':
      return action.data;
    case 'clear':
      return {};
    default:
      throw new Error();
  }
};

const ChannelContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { messages: [] });
  const dispatchProxy = (action) => {
    switch (action.type) {
      case 'fetch':
        return axios.get('/api/messages')
          .then(res => ({
            messages: res.data.messages,
          }))
          .then(({ messages }) => {
            dispatch({
              type: 'set',
              data: { messages },
            });
          });
      default:
        return dispatch(action);
    }
  };
  useEffect(() => {
    dispatchProxy({ type: 'fetch' });
  }, []);
  return (
    <ChannelContext.Provider value={{ state, dispatch: dispatchProxy }}>
      { children }
    </ChannelContext.Provider>
  );
};

const ChannelContextConsumer = ChannelContext.Consumer;

export { ChannelContext, ChannelContextProvider, ChannelContextConsumer };
