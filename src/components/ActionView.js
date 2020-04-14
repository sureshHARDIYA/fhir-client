import React from 'react';
import { Button, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import JsonHighlighter from './JsonHighlighter';

export const ButtonAction = ({ record, title }) => (
  <Button onClick={() => Modal.info({
    title,
    width: '700px',
    content: <JsonHighlighter code={JSON.stringify(record, null, 1)} />
  })}>
    <EyeOutlined />
  </Button>
)
