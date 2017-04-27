import './css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './js/app';

import { configureStore } from './js/data/store';



if (ENV.DEBUG)
{
  window.console.info('DEBUG MODE ENABLED');
}


ReactDOM.render(
  <Provider store={ configureStore() }>
    <App />
  </Provider>,
  document.getElementById('app')
);
