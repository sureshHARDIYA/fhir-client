import React from "react";
import { Form, Card, Button, Popconfirm } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { CodeableConcept } from "./CodeableConcept";
import { HumanName } from "./HumanName";
import { ContactPoint } from "./ContactPoint";
import { Address } from "./Address";

export interface IElement {
  name: string | string[];
  label: string;
  labelAdd?: string;
  placeholder?: string;
}

export const Contact: React.FC<IElement> = ({ name, labelAdd, label }) => (
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
            <CodeableConcept
              name={[index.toString(), 'purpose']}
              label="Purpose"
            />
            <HumanName
              name={[index.toString(), 'name']}
              label="Name"
            />
            <ContactPoint
              name={[index.toString(), 'telecom']}
              label="Telecom"
            />
            <Address
              name={[index.toString(), 'address']}
              label="Address"
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