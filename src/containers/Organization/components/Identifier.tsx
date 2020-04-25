import React from "react";
import { Form, Card, Button, Radio, Popconfirm } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { CodeableConcept } from "./CodeableConcept";

export interface IElement {
  name: string | string[];
  label: string;
  labelAdd?: string;
  placeholder?: string;
}

export const Identifier: React.FC<IElement> = ({ name, labelAdd, label }) => (
  <Form.List name={[...(Array.isArray(name) ? name : [name])]}>
    {(fields, { add, remove }) => (
      <div>
        {fields.map((field, index) => (
          <Card
            size="small"
            style={{ marginBottom: 15 }}
            key={field.key} title={`${label} #${index + 1}`}
            extra={(
              <Popconfirm
                okText="Yes"
                cancelText="No"
                placement="topLeft"
                onConfirm={() => remove(field.name)}
                title={"Sure to delete identifier?"}
              >
                <Button size="small" type="danger">
                  Remove
                </Button>
              </Popconfirm>
            )}
          >
            <Form.Item
              label="Use:"
              name={[index, 'use']}
              validateTrigger={['onChange', 'onBlur']}
            >
              <Radio.Group>
                <Radio.Button value="usual">Usual</Radio.Button>
                <Radio.Button value="official">Official</Radio.Button>
                <Radio.Button value="temp">Temp</Radio.Button>
                <Radio.Button value="secondary">Secondary</Radio.Button>
                <Radio.Button value="old">Old (If known)</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <CodeableConcept
              label="Type"
              name={[index.toString(), 'type']}
            />
        </Card>
        ))}
        <Form.Item label="">
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