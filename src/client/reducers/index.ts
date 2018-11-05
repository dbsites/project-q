/**
 * @module index.ts
 * @description Combine Reducers
 */

import { combineReducers, Reducer } from 'redux';

// Import all reducers
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import userReducer from './userReducer';
import issuesReducer from './issuesReducer';
import surveyReducer from './surveyReducer';

// Combine reducers
const reducers: Reducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  user: userReducer,
  issues: issuesReducer,
  survey: surveyReducer,
});

export default reducers;
