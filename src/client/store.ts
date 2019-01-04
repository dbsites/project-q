/**
 * @module store.js
 * @description Redux Store - Single Source of Truth
 */

import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';
import { ApplicationState } from './reducers/types';

// Build store variant for production environment
const prodStore = createStore(
  reducers, 
  applyMiddleware(thunk as ThunkMiddleware<ApplicationState>),
);

// Add composeWithDevTools for Redux Dev Tools if not in production
const devStore = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<ApplicationState>),
  ),
);

// Determine which store to export using NODE_ENV
const store = process.env.NODE_ENV as string === 'production' ? prodStore : devStore;

export default store;
