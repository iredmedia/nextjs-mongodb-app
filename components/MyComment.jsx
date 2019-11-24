import React from 'react';
import moment from 'moment';
import { Avatar, Comment, Tooltip } from 'antd';

const MyComment = (props) => {
  const { message } = props;

  if (!message) return null;

  return (
    <Comment
      author={<a>Han Solo</a>}
      avatar={(
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      )}
      content={(
        <p>
          {message.body}
        </p>
      )}
      datetime={(
        <Tooltip title={moment(message.created_at).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(message.created_at).fromNow()}</span>
        </Tooltip>
      )}
    />
  );
};

export default MyComment;
