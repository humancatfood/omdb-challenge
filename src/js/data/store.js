import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';



export const configureStore = () => {

  const middleWare = [
    ENV.DEBUG && createLogger()
  ].filter(Boolean);
  const store = createStore(reducers, applyMiddleware(...middleWare));

  // here: add more initialisation stuff for the store here

  return store;

};

