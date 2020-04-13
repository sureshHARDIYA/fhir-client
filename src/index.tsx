import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import { App } from './containers';
import { Auth } from './containers/Auth';


if ((location as any).protocol === "https:") { // eslint-disable-line
  (location as any).protocol = "http:"; // eslint-disable-line
}

ReactDOM.render((
  <BrowserRouter>
    <Auth>
      <App />
    </Auth>
  </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
