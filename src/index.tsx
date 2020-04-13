import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { ExchangeRates } from './ExchangeRates';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
});

const App = () => (
  <ApolloProvider client={client}>
    <Layout className="layout">
      <Layout.Content>
        <ExchangeRates />
      </Layout.Content>
    </Layout>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
