import './css/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './js/pages/Main';
import Film from './js/pages/Film';
import FourOhFour from './js/pages/FourOhFour';

import { configureStore } from './js/data/store';



if (ENV.DEBUG)
{
  window.console.info('DEBUG MODE ENABLED');
}


ReactDOM.render(
  <Provider store={ configureStore() }>
    <Router>
      <Switch>
        <Route exact path="/" render={ () => <Main /> } />
        <Route path="/film/:id" render={ ({ match }) => <Film filmId={ match.params.id } /> } />
        <Route render={ ({ location }) => <FourOhFour path={ location.pathname } /> } />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);
