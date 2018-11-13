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
import { SurveyState, LoadingState } from './reducers/types';

// TODO: Find more appropriate home for interface
interface Props {
  isAuth: boolean,
  issues: string[],
  issuesComplete: boolean | null,
  issuesSelected: any,
  fetchAuth: any,
  loading: LoadingState,
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
  }

  render() {
    // Destructure auth status from props
    const { isAuth, fetchAuth, loading } = this.props;
    if (loading.authLoading === true) {
      return <Loading />
    }
    if (isAuth === null) {
      fetchAuth();
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
const mapStateToProps = (state: any): any => {
  return {
    isAuth: state.user.isAuth,
    issues: state.issues,
    issuesComplete: state.user.issuesComplete,
    issuesSelected: state.user.issuesSelected,
    loading: state.loading,
    surveyComplete: state.user.surveyComplete,
    survey: state.survey,
    surveyPage: state.user.surveyPage,
    userId: state.user.userId,
  };
}

const mapDispatchToProps = (dispatch: any): any => {
  return {
    fetchAuth: () => dispatch(actions.fetchAuth()),
    fetchIssues: () => dispatch(actions.fetchIssues()),
    prevPage: () => dispatch(actions.prevPage()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
