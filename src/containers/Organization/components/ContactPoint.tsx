import React from "react";
import { Form, Card, Button, Radio, InputNumber, Input, Popconfirm } from "antd";
import { PlusOutlined } from '@ant-design/icons';

export interface IElement {
  name: string | string[];
  label: string;
  labelAdd?: string;
  placeholder?: string;
}

export const ContactPoint: React.FC<IElement> = ({ name, label, labelAdd }) => (
  <Form.List name={[...(Array.isArray(name) ? name : [name])]}>
    {(fields, { add, remove }) => (
      <div>
        {fields.map((field, index) => (
          <Card
            style={{ border: 0 }}
            size="small"
            key={field.key}
            title={`${label}: #${index + 1}`}
            extra={(
              <Popconfirm
                okText="Yes"
                cancelText="No"
                placement="topLeft"
                onConfirm={() => remove(field.name)}
                title={"Sure to delete contact?"}
              >
                <Button size="small" type="danger">
                  Remove
                </Button>
              </Popconfirm>
            )}
            headStyle={{ padding: 0 }}
            bodyStyle={{ padding: 0 }}
          >
            <Form.Item
              label="System:"
              name={[index, 'system']}
            >
              <Radio.Group>
                <Radio.Button value="phone">Phone</Radio.Button>
                <Radio.Button value="fax">Fax</Radio.Button>
                <Radio.Button value="email">Email</Radio.Button>
                <Radio.Button value="pager">Pager</Radio.Button>
                <Radio.Button value="url">Url</Radio.Button>
                <Radio.Button value="sms">Sms</Radio.Button>
                <Radio.Button value="other">Other</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Value:"
              name={[index, 'value']}
            >
              <Input placeholder="The actual contact point details"/>
            </Form.Item>
            <Form.Item
              label="Use:"
              name={[index, 'use']}
            >
              <Radio.Group>
                <Radio.Button value="home">Home</Radio.Button>
                <Radio.Button value="work">Work</Radio.Button>
                <Radio.Button value="temp">Temp</Radio.Button>
                <Radio.Button value="old">Old</Radio.Button>
                <Radio.Button value="mobile">Mobile</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Rank:"
              name={[index, 'rank']}
            >
              <InputNumber placeholder="Specify preferred order of use (1 = highest)" max={1} min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Card>
        ))}
        <Form.Item>
          <Button
            type="dashed"
            style={{ width: '100%' }}
            onClick={() => add()}
          >
            <PlusOutlined /> {labelAdd || label}
          </Button>
        </Form.Item>
      </div>
    )}
  </Form.List>
);