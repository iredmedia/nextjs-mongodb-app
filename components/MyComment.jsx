import React from 'react';
import moment from 'moment';
import { Avatar, Comment, Tooltip } from 'antd';

const MyComment = (props) => (
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
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully
        and efficiently.
      </p>
    )}
    datetime={(
      <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().fromNow()}</span>
      </Tooltip>
    )}
  />
);

export default MyComment;
