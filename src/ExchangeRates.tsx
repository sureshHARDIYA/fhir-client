import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { List, Typography, Row, Col, Divider } from 'antd';

const EXCHANGE_RATES = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

interface IRate {
  currency: string;
  rate: string;
}

export const ExchangeRates: FC<{}> = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Row gutter={[16, 16]} justify="center">
      <Col
        span={24}
        md={{ span: 12 }}
      >
        <Divider>ExchangeRates List</Divider>
        <List
          bordered
          header={<div></div>}
          dataSource={data.rates}
          renderItem={(item: IRate) => (
            <List.Item>
              <Typography.Text mark>[{item.currency}]</Typography.Text> {item.rate}
            </List.Item>
          )}
        />
      </Col>
    </Row>

  );
};
