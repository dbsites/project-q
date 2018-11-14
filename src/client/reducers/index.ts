/**
 * @module index.ts
 * @description Combine Reducers
 */

import { combineReducers, Reducer } from 'redux';

// Import all reducers
import companyReducer from './companyReducer';
import formReducer from './formReducer';
import issuesReducer from './issuesReducer';
import loadingReducer from './loadingReducer';
import surveyReducer from './surveyReducer';
import userReducer from './userReducer';

// Import store type
import { ApplicationState } from './types';

// Combine reducers
const reducers: Reducer = combineReducers<ApplicationState>({
  company: companyReducer,
  form: formReducer,
  issues: issuesReducer,
  loading: loadingReducer,
  survey: surveyReducer,
  user: userReducer,
});

export default reducers;
