import React from 'react';
import { Row, Col, Table, Divider } from 'antd';
import { useSearch } from './useSearch';
// import { Link } from 'react-router-dom';

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
    key: "title",
    dataIndex: "title",
    render: (item: string, record: any) => {
      const name = (record.name || [])[0] || {};

      return (
        <span>
          {[(name.given || [])[0] || "", name.family || ""].join(" ").trim()}
        </span>
      );
    },
  },
  {
    title: "Gender",
    key: "gender",
    dataIndex: "gender",
  },
  {
    title: "Status",
    key: "active",
    dataIndex: "active",
    render: (item: boolean) => <span>{item ? "Active" : "Not Active"}</span>,
  },
];

export const Patient = () => {
  const { total, loading, current, pageSize, onChange, list, onPageSize } = useSearch();

  return (
    <Row>
      <Col span={24}>
        <Divider>
          Patient List
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

export default Patient;