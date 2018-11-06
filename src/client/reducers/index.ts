/**
 * @module index.ts
 * @description Combine Reducers
 */

import { combineReducers, Reducer } from 'redux';

// Import all reducers
// import loginReducer from './loginReducer';
// import registerReducer from './registerReducer';
import userReducer from './userReducer';
import issuesReducer from './issuesReducer';
import surveyReducer from './surveyReducer';

// Import store type
import { ApplicationState } from './types';
import formReducer from './formReducer';

// Combine reducers
const reducers: Reducer = combineReducers<ApplicationState>({
  // login: loginReducer,
  // register: registerReducer,
  form: formReducer,
  user: userReducer,
  issues: issuesReducer,
  survey: surveyReducer,
});

export default reducers;
