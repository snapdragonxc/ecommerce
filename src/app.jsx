import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
// import logger from 'redux-logger';
import reducers from './reducers';
import Main from './main';

// const store = createStore(reducers, applyMiddleware(thunk, logger));
const store = createStore(reducers, applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={ store }>
    <Main />
  </Provider>,
  document.getElementById('root'),
);
