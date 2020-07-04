import React from "react";
import { Row, Col, Table, Divider } from "antd";

import { useSearch } from "./useSearch";
import { ButtonAction } from "../../components/ActionView";

const columns = (pageSize: number, current: number) => [
  {
    title: "No",
    key: "id",
    width: 80,
    dataIndex: "id",
    render: (_: any, _r: any, index: number) =>
      pageSize * (current - 1) + index + 1
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status"
  },
  {
    key: "id",
    width: 80,
    title: "Action",
    dataIndex: "id",
    render: (_: any, record: any) => (
      <ButtonAction title="Observation Detail" record={record} />
    )
  }
];

export const Observation = () => {
  const {
    total,
    loading,
    current,
    pageSize,
    onChange,
    list,
    onPageSize
  } = useSearch();

  return (
    <Row>
      <Col span={24}>
        <Divider>Observation List</Divider>
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
            onShowSizeChange: onPageSize
          }}
        />
      </Col>
    </Row>
  );
};

export default Observation;
