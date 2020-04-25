import React from "react";
import { Form, Button, Input, Popconfirm } from "antd";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

export interface IElement {
  name: string | string[];
  label: string;
  labelAdd?: string;
  placeholder?: string;
}

export const FormList: React.FC<IElement> = ({ name, label, placeholder, labelAdd }) => (
  <Form.List name={[...(Array.isArray(name) ? name : [name])]}>
    {(fields, { add, remove }) => (
      <div>
        {fields.map((field, index) => (
          <Form.Item
            label={index === 0 ? label + ':' : ''}
            required={false}
            key={field.key}
          >
            <Form.Item
              {...field}
              validateTrigger={['onChange', 'onBlur']}
              noStyle
            >
              <Input
                placeholder={placeholder || ''}
                addonAfter={(
                  <Popconfirm
                    okText="Yes"
                    cancelText="No"
                    placement="topLeft"
                    onConfirm={() => remove(field.name)}
                    title={"Sure to delete line?"}
                  >
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{ margin: '0 8px' }}
                    />
                  </Popconfirm>
                )}
              />
            </Form.Item>
          </Form.Item>
        ))}
        <Form.Item label="">
          <Button
            type="dashed"
            onClick={() => add()}
            style={{ width: '100%' }}
          >
            <PlusOutlined /> {labelAdd}
          </Button>
        </Form.Item>
      </div>
    )}
  </Form.List>
);
