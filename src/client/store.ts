/**
 * @module store.js
 * @description Redux Store - Single Source of Truth
 */

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';

// Add composeWithDevTools for Redux Dev Tools
const store = createStore(
  reducers,
  composeWithDevTools(),
);

export default store;
