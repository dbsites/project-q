/**
 * @module App.tsx
 * @description App Container
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import * as actions from './actions/actionCreators';

import DashContainer from './containers/DashContainer'
import Loading from './components/loading/Loading'
import Mobile from './components/mobile/Mobile';

// Import Types
import { SurveyState, LoadingState } from './reducers/types';

// TODO: Find more appropriate home for interface
interface Props {
  deviceType: string | null,
  isAuth: boolean,
  issues: string[],
  issuesComplete: boolean | null,
  issuesSelected: any,
  fetchAuth: any,
  loading: LoadingState,
  onboardComplete: boolean | null,
  setDevice: any,
  surveyComplete: boolean | null,
  survey: SurveyState,
  surveyPage: number,
  userId: string,
}

class App extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    // Destructure auth status from props
    const { deviceType, isAuth, fetchAuth, setDevice, loading } = this.props;
    
    // Check for non-desktop device
    if (window.innerWidth < 1000 ||
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPod/i)
    ) {
      setDevice('mobile');
    } else {
      setDevice('desktop');
    }

    if(deviceType === 'mobile') {
      return <Mobile />;
    }

    if (loading.authLoading === true) {
      return <Loading loadingMessage="Calculating" />;
    }
    if (isAuth === null) {
      fetchAuth();
      return <Loading loadingMessage="Calculating" />;
    } 
    if (isAuth === false) {
      // If user hasn't been authenticated, redirect to Registration
      return <Redirect to='/account/register' />;
    }
    // Otherwise render dashboard
    return <DashContainer userState={this.props} />;
  }
};

// mapStatetoProps to access user auth status
const mapStateToProps = (state: any): any => {
  return {
    deviceType: state.device.deviceType,
    isAuth: state.user.isAuth,
    issues: state.issues,
    issuesComplete: state.user.issuesComplete,
    issuesSelected: state.user.issuesSelected,
    loading: state.loading,
    onboardComplete: state.user.onboardComplete,
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
    setDevice: (deviceType: string) => dispatch(actions.setDevice(deviceType)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
