import './css/index.css';

import React from 'react';
import ReactDom from 'react-dom';

import App from './js/app';




if (ENV.DEBUG)
{
  window.console.info('DEBUG MODE ENABLED');
}



ReactDom.render(
  <App />,
  document.getElementById('app'));
