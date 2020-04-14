import React from 'react';
import { Row, Col, Table, Divider } from 'antd';
import { useSearch, IOrganization } from './useSearch';
import { ButtonAction } from '../../components/ActionView';

const columns = (pageSize: number, current: number) => [
  {
    title: "No",
    key: "id",
    width: 80,
    dataIndex: "id",
    render: (_: any, _r: any, index: number) => pageSize * (current - 1) + index + 1,
  },
  {
    title: "Name",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "Address",
    key: "address",
    dataIndex: "address",
    render: (_: string, record: IOrganization) => {
      const addressLine = record.address || [];

      return addressLine.map((item: { text?: string | null }, index: number) => !!item.text && (
        <span key={index}>
          {item.text}
          {","}
        </span>
      ));
    },
  },
  {
    title: "Active",
    key: "active",
    dataIndex: "active",
    render: (item: boolean | null) => <span>{item ? "Active" : "Not Active"}</span>,
  },
  {
    key: "id",
    width: 80,
    title: "Action",
    dataIndex: "id",
    render: (_: any, record: any) => <ButtonAction title="Organization Detail" record={record} />,
  },
];

export const Organization = () => {
  const { total, loading, current, pageSize, onChange, list, onPageSize } = useSearch();

  return (
    <Row>
      <Col span={24}>
        <Divider>
          Organization List
        </Divider>
      </Col>
      <Col span={24}>
        <Table
          rowKey="id"
          dataSource={list}
          loading={loading}
          columns={columns(pageSize, current)}
          pagination={{
            total,
            current,
            pageSize,
            onChange,
            onShowSizeChange: onPageSize,
          }}
        />
      </Col>
    </Row>
  );
};

export default Organization;