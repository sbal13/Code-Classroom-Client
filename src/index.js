import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter, Route } from 'react-router-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducer from './redux/reducer'
import { ActionCableProvider } from "react-actioncable-provider";
const store = createStore(
  reducer, 
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <ActionCableProvider url="ws://localhost:4000/cable">
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </ActionCableProvider>
  </Provider>
, document.getElementById('root'));
