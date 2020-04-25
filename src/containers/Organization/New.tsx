import React, { useState, useCallback } from 'react';
import { Form, Input, Switch, Card, Button, notification } from 'antd';
import { useCreate } from './useCreate';
import { Identifier } from './components/Identifier';
import { CodeableConcept } from './components/CodeableConcept';
import { ContactPoint } from './components/ContactPoint';
import { Address } from './components/Address';
import { Contact } from './components/Contact';


const contentList = {
  general: (
    <>
      <Form.Item name="name" label="Name:" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Active:" name="active">
        <Switch defaultChecked={false} />
      </Form.Item>
      <CodeableConcept
        name="type"
        label="Type"
      />
    </>
  ),
  identifier: (
    <Identifier
      name="identifier"
      label="Identifier"
    />
  ),
  telecom: (
    <ContactPoint
      name="telecom"
      label="Telecom"
    />
  ),
  address: (
    <Address
      name="address"
      label="Address"
    />
  ),
  contact: (
    <Contact
      name="contact"
      label="Contact"
    />
  ),
};

export const OrganizationNew = () => {
  const [tab, setTab] = useState<string>('general');
  const [form] = Form.useForm();
  const { onCreate } = useCreate();

  const onFinish = (values: any) => {
    console.log(values);
    onCreate(values);
  };


  const onSubmit = useCallback(async () => {
    try {
      await form.validateFields();
      form.submit();
    } catch (e) {
      notification.error({
        message: 'Validation Failure',
        description: 'Invalid data, please check your form',
      });
    }
  }, [form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Card
        title="Add Organization"
        activeTabKey={tab}
        onTabChange={(key) => setTab(key)}
        extra={(
          <>
            <Button type="primary" onClick={onSubmit}>
              Submit
            </Button>
          </>
        )}
        tabList={[
          {
            key: 'general',
            tab: 'General Information',
          },
          {
            key: 'identifier',
            tab: 'Identifier',
          },
          {
            key: 'telecom',
            tab: 'Telecom',
          },
          {
            key: 'address',
            tab: 'Address',
          },
          {
            key: 'contact',
            tab: 'Contact',
          },
        ]}
      >
        {Object.entries(contentList).map(([key, content]) => (
          <div key={key} style={{ display: key === tab ? 'block' : 'none' }}>
            {content}
          </div>
        ))}
      </Card>
    </Form>
  );
};
