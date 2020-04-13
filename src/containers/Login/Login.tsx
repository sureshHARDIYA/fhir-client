import React from 'react';
import { Row, Col, Button, Card } from 'antd';

export const Login = () => (
  <Row justify="center" align="middle" style={{ marginTop: "50px" }}>
    <Col span={24} md={{ span: 8 }}>
      <Card title="Login" style={{ textAlign: 'center' }}>
        <Button
          href={`${process.env.REACT_APP_OAUTH_URL}/auth?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=id_token+token&scope=openid+email+patient/*.*&nonce=${Date.now()}&prompt=login`}
        >
          Click Login
        </Button>
      </Card>
    </Col>
  </Row>
);

export default Login;
