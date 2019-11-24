import React from 'react';
import {
  Icon,
  Button,
  Card,
} from 'antd';

const Extras = props => (
  <Button.Group size="small">
    <Button>
      <Icon type="check" />
      Approve
    </Button>
    <Button>
      <Icon type="close" />
      Reject
    </Button>
  </Button.Group>
);

const MyCard = (props) => (
  <Card title="Breno Roofing" extra={<Extras />}>
    <p>$2600</p>
    <p>View Document</p>
  </Card>
);

export default MyCard;
