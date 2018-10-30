/**
 * @module index.ts
 * @description Combine Reducers
 */

import { combineReducers, Reducer } from 'redux';

// Import all reducers
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';

// Combine reducers
const reducers: Reducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
});

export default reducers;
