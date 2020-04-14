import React, { FC, Suspense, useState, useEffect } from 'react';
import Cookie from "js-cookie";
import { Layout, Spin, Row, Col, Button, Menu } from 'antd';
import { ApolloProvider } from '@apollo/react-hooks';
import {BrowserRouter, Route, Switch, useHistory, useLocation} from "react-router-dom";
import { DashboardOutlined, BankOutlined, UsergroupAddOutlined, FormOutlined, CopyOutlined } from '@ant-design/icons';

import { useAuth } from './Auth';
import { client } from "../apollo-client";

const Login = React.lazy(() => import('./Login/Login'));
const Dashboard = React.lazy(() => import('./Dashboard/Dashboard'));
const Patient = React.lazy(() => import('./Patient/Patient'));
const Valueset = React.lazy(() => import('./Valueset/Valueset'));
const Questionnaire = React.lazy(() => import('./Questionnaire/Questionnaire'));
const Organization = React.lazy(() => import('./Organization/Organization'));

const AppAuth: FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const history = useHistory();
  const selected = [useLocation().pathname.replace(/^\//, '') || "dashboards"];

  return (
    <Layout>
      <Layout.Header style={{ padding: '0 15px' }}>
        <Row gutter={16}>
          <Col flex="auto">
            <Button onClick={() => history.push('/')}>
              Admin Management
            </Button>
          </Col>
          <Col flex="100px">
            <Button onClick={() => onLogout()}>Logout</Button>
          </Col>
        </Row>
      </Layout.Header>
      <Layout>
        <Layout.Sider width={200} className="site-layout-background">
          <Menu
            theme="dark"
            defaultSelectedKeys={selected}
          >
            <Menu.Item key="dashboards" onClick={() => history.push('/')}>
              <DashboardOutlined /> Dashboard
            </Menu.Item>
            <Menu.Item key="patients" onClick={() => history.push('/patients')}>
              <UsergroupAddOutlined /> Patient
            </Menu.Item>
            <Menu.Item key="organizations" onClick={() => history.push('/organizations')}>
              <BankOutlined /> Organization
            </Menu.Item>
            <Menu.Item key="questionnaires" onClick={() => history.push('/questionnaires')}>
              <FormOutlined /> Questionnaire
            </Menu.Item>
            <Menu.Item key="valuesets" onClick={() => history.push('/valuesets')}>
              <CopyOutlined /> Valueset
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout>
          <Layout.Content style={{ padding: 15 }}>
            <Suspense fallback={<Spin spinning />}>
              <Switch>
                <Route exact path={"/"} component={Dashboard} />
                <Route exact path={"/patients"} component={Patient} />
                <Route exact path={"/organizations"} component={Organization} />
                <Route exact path={"/questionnaires"} component={Questionnaire} />
                <Route exact path={"/valuesets"} component={Valueset} />
              </Switch>
            </Suspense>
          </Layout.Content>
          <Layout.Footer style={{ textAlign: 'center' }}>
            Management System © 2020
          </Layout.Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

const AppUnauth = () => (
  <Layout>
    <Layout.Content>
      <Suspense fallback={<Spin spinning />}>
        <Switch>
          <Route component={Login} />
        </Switch>
      </Suspense>
    </Layout.Content>
    <Layout.Footer style={{ textAlign: 'center' }}>
      Management System © 2020
    </Layout.Footer>
  </Layout>
);

export const App: FC<{}> = () => {
  const [loading, setLoad] = useState<boolean>(true);
  const { isAuthenticated, setToken, onLogout } = useAuth();

  useEffect(() => {
    setLoad(false);
    setToken(Cookie.get("access_token") || '');
  }, [setToken]);

  if (loading) {
    return (
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col>
          <Spin spinning />
        </Col>
      </Row>
    );
  }

  return (
    <ApolloProvider client={client}>
      <Layout
        className="admin-components"
        style={{ minHeight: '100vh' }}
      >
        <BrowserRouter>
          {isAuthenticated ? <AppAuth onLogout={onLogout} /> : <AppUnauth />}
        </BrowserRouter>
      </Layout>
    </ApolloProvider>
  );
};
