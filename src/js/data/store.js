import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';



export const configureStore = () => {

  const store = createStore(reducers, applyMiddleware(createLogger()));

  // here: add more initialisation stuff for the store here

  return store;

};

