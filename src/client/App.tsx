/**
 * @module App.tsx
 * @description App Container
 */


import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import * as actions from './actions/actionCreators';

import DashContainer from './containers/DashContainer'
import { SurveyState } from './reducers/types';

// TODO: Find more appropriate home for interface
interface Props {
  isAuth: boolean,
  issues: string[],
  issuesComplete: boolean | null,
  surveyComplete: boolean | null,
  survey: SurveyState,
  userId: string,
}

class App extends React.Component<Props> {
  constructor (props: any) {
    super(props);
  }

  // Upon mount, check if user is logged in
  componentDidMount() {
    // Extract authUser action from props
    const { authUser } = this.props as any;

    // Extract user id from cookie if it exists
    if (document.cookie) {
      const cookieArray = document.cookie.split(';');
      for (let item of cookieArray) {
        let itemString = item.trim();
        if(itemString.startsWith('key=')) {
          return authUser(itemString.substr(4));
        }
      }
    }
    // If cookie not found, return authUser(false)
    return authUser('cookie not found');
  }

  render() {
    // Destructure auth status from props
    const { isAuth } = this.props;
    if (isAuth === false) {
      return <Redirect to='/account/login' />
    }
    return <DashContainer userState={this.props} />
  }
};

// mapStatetoProps to access user auth status
const mapStateToProps = (state: any): Props => {
  return {
    isAuth: state.user.isAuth,
    issues: state.user.issues,
    issuesComplete: state.user.issuesComplete,
    surveyComplete: state.user.surveyComplete,
    survey: state.survey,
    userId: state.user.userId,
  }
}

const mapDispatchToProps = (dispatch: any): any => {
  return {
    authUser: (userId: string) => dispatch(actions.authUser(userId)),
    prevPage: () => dispatch(actions.prevPage()),
    submitSurvey: (surveyObj: any) => dispatch(actions.submitSurvey(surveyObj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
