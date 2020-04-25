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

export const Address: React.FC<IElement> = ({ name, label, labelAdd }) => (
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
                title={"Sure to delete address?"}
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
                <Radio.Button value="home">Home</Radio.Button>
                <Radio.Button value="work">Work</Radio.Button>
                <Radio.Button value="temp">Temp</Radio.Button>
                <Radio.Button value="old">Old</Radio.Button>
                <Radio.Button value="billing">Billing</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Type:"
              name={[index, 'type']}
            >
              <Radio.Group>
                <Radio.Button value="postal">Postal</Radio.Button>
                <Radio.Button value="physical">Physical</Radio.Button>
                <Radio.Button value="both">Both</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Text:"
              name={[index, 'text']}
            >
              <Input placeholder="Text representation of the address"/>
            </Form.Item>
            <FormList
              label="Line"
              labelAdd="Add line"
              name={[index.toString(), 'line']}
              placeholder="Street name, number, direction & P.O. Box etc"
            />
            <Form.Item
              label="City:"
              name={[index, 'city']}
            >
              <Input placeholder="Name of city, town etc."/>
            </Form.Item>
            <Form.Item
              label="District:"
              name={[index, 'district']}
            >
              <Input placeholder="District name (aka county)."/>
            </Form.Item>
            <Form.Item
              label="State:"
              name={[index, 'state']}
            >
              <Input placeholder="Sub-unit of country (abbreviations ok)."/>
            </Form.Item>
            <Form.Item
              label="Postal code:"
              name={[index, 'postalCode']}
            >
              <Input placeholder="Postal code for area."/>
            </Form.Item>
            <Form.Item
              label="Country:"
              name={[index, 'country']}
            >
              <Input placeholder="Country (e.g. can be ISO 3166 2 or 3 letter code)."/>
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
