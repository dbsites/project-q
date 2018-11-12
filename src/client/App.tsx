/**
 * @module App.tsx
 * @description App Container
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import * as actions from './actions/actionCreators';

import DashContainer from './containers/DashContainer'

import Loading from './components/Loading'

// Import Types
import { SurveyState } from './reducers/types';

// TODO: Find more appropriate home for interface
interface Props {
  isAuth: boolean,
  issues: string[],
  issuesComplete: boolean | null,
  selectedIssues: any,
  surveyComplete: boolean | null,
  survey: SurveyState,
  surveyPage: number,
  userId: string,
}

class App extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  // Upon mount, check if user is logged in
  componentDidMount() {
    // Extract fetchAuth action from props and call
    const { fetchAuth } = this.props as any;
    fetchAuth();
  }

  render() {
    // Destructure auth status from props
    const { isAuth } = this.props;
    if (isAuth === null) {
      return <Loading />
    }
    if (isAuth === false) {
      // If user hasn't been authenticated, redirect to Registration
      return <Redirect to='/account/register' />
    }
    // Otherwise render dashboard
    return <DashContainer userState={this.props} />
  }
};

// mapStatetoProps to access user auth status
const mapStateToProps = (state: any): Props => {
  return {
    isAuth: state.user.isAuth,
    issues: state.user.issues,
    issuesComplete: state.user.issuesComplete,
    selectedIssues: state.user.issues,
    surveyComplete: state.user.surveyComplete,
    survey: state.survey,
    surveyPage: state.user.surveyPage,
    userId: state.user.userId,
  }
}

const mapDispatchToProps = (dispatch: any): any => {
  return {
    fetchAuth: () => dispatch(actions.fetchAuth()),
    prevPage: () => dispatch(actions.prevPage()),
    submitSurvey: (surveyObj: any) => dispatch(actions.submitSurvey(surveyObj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
