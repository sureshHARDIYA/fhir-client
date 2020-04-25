
import React from "react";
import { Form, Card, Button, Input, Switch, Popconfirm } from "antd";
import { PlusOutlined } from '@ant-design/icons';

export interface IElement {
  name: string | string[];
  label: string;
  labelAdd?: string;
  placeholder?: string;
}

export const CodeableConcept: React.FC<IElement> = ({ name, label }) => (
  <Card title={label} size="small" style={{ marginBottom: 15 }}>
  <Form.Item
    label="Text:"
    name={[...(Array.isArray(name) ? name : [name]), 'text']}
    validateTrigger={['onChange', 'onBlur']}
  >
    <Input placeholder="Plain text representation of the concept"/>
  </Form.Item>
  <Form.List name={[...(Array.isArray(name) ? name : [name]), 'coding']}>
    {(fields, { add, remove }) => (
      <div>
        {fields.map((field, index) => (
          <Card
            style={{ border: 0 }}
            size="small"
            key={field.key}
            title={`Coding: #${index + 1}`}
            extra={(
              <Popconfirm
                okText="Yes"
                cancelText="No"
                placement="topLeft"
                onConfirm={() => remove(field.name)}
                title={"Sure to delete coding?"}
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
              <Input placeholder="Identity of the terminology system"/>
            </Form.Item>
            <Form.Item
              label="Version:"
              name={[index, 'version']}
            >
              <Input placeholder="Version of the system - if relevant"/>
            </Form.Item>
            <Form.Item
              label="Code:"
              name={[index, 'code']}
            >
              <Input placeholder="Symbol in syntax defined by the system"/>
            </Form.Item>
            <Form.Item
              label="Display:"
              name={[index, 'display']}
            >
              <Input placeholder="Representation defined by the system"/>
            </Form.Item>
            <Form.Item
              label="User Selected:"
              name={[index, 'userSelected']}
            >
              <Switch defaultChecked={false} />
            </Form.Item>
          </Card>
        ))}
        <Form.Item>
          <Button
            type="dashed"
            style={{ width: '100%' }}
            onClick={() => add()}
          >
            <PlusOutlined /> Coding
          </Button>
        </Form.Item>
      </div>
    )}
  </Form.List>
</Card>
);