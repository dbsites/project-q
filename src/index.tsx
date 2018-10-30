/**
 * ************************************
 *
 * @module  index.tsx
 * @author Team Quail
 * @date
 * @description Application Entry Point. Hang React App off #App in index.html
 *
 * ************************************
 */

import * as React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';

import App from "./client/App";
import store from './client/store'

// Wrap App in Provider (passing in store)
render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('App'),
);
