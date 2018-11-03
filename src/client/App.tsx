/**
 * @module App.tsx
 * @description App Container
 */


import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import DashContainer from './containers/DashContainer'

// TODO: Find more appropriate home for interface
interface Props {
  isAuth: boolean;
}

class App extends React.Component<Props> {
  constructor (props: any) {
    super(props);
  }

  render() {
    // Destructure auth status from props
    console.log(this.props);
    const { isAuth } = this.props;
    if (isAuth) {
      return <DashContainer />
    }
    return <Redirect to='/account/login' />
  }
};

// mapStatetoProps to access user auth status
const mapStateToProps = (state: any) => {
  return {
    isAuth: state.user.isAuth,
  }
}

export default connect(mapStateToProps, null)(App);
