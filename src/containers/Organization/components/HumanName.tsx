import React from "react";
import { Form, Card, Button, Radio, Input, Popconfirm } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { FormList } from "./FormList";

export interface IElement {
  name: string | string[];
  label: string;
  labelAdd?: string;
  placeholder?: string;
}

export const HumanName: React.FC<IElement> = ({ name, labelAdd, label }) => (
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
                title={"Sure to delete row?"}
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
              label="Use:"
              name={[index, 'use']}
            >
              <Radio.Group>
                <Radio.Button value="usual">Usual</Radio.Button>
                <Radio.Button value="official">Official</Radio.Button>
                <Radio.Button value="temp">Temp</Radio.Button>
                <Radio.Button value="nickname">Nickname</Radio.Button>
                <Radio.Button value="anonymous">Anonymous</Radio.Button>
                <Radio.Button value="old">Old</Radio.Button>
                <Radio.Button value="maiden">Maiden</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Text:"
              name={[index, 'text']}
            >
              <Input placeholder="Text representation of the full name"/>
            </Form.Item>
            <Form.Item
              label="Family:"
              name={[index, 'family']}
            >
              <Input placeholder="Family name (often called 'Surname')"/>
            </Form.Item>
            <FormList
              name="given"
              placeholder="middle name"
              labelAdd="Add middle name"
              label="Middle name"
            />
            <FormList
              name="prefix"
              placeholder="Parts that come before the name"
              labelAdd="Add prefix"
              label="Prefix"
            />
            <FormList
              name="suffix"
              placeholder="Parts that come after the name"
              labelAdd="Add suffix"
              label="Suffix"
            />
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
