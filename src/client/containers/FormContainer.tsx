/**
 * @module FormContainer.tsx
 * @description Form Container for Login/Register Forms
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; // Access route params

import * as actions from '../actions/actionCreators'

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

// TODO: Assign explicit type to store
// Extract form values from store to pass as props
const mapStateToProps: any = (store: any) => ({
  loginFields: {
    loginEmail: store.login.loginEmail,
    loginPassword: store.login.loginPassword,
    rememberMe: store.login.rememberMe,
  },
  registerFields: {
    firstName: store.register.firstName,
    lastName: store.register.lastName,
    registerEmail: store.register.registerEmail,
    registerPassword: store.register.registerPassword,
    confirmPassword: store.register.confirmPassword,
    agreeTerms: store.register.agreeTerms,
  },
});

// TODO: Assign explicit type to dispatch
// TODO: Explicit type to event

// Extract form update and submit actions from store to pass as props
const mapDispatchToProps: any = (dispatch: any) => {
  return {
    updateLoginField: (event: any) => {
      // If input is a checkbox, payload is checked status, otherwise payload is value
      const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;
      return dispatch(actions.updateLoginField({field: event.target.name, value: value}));
    },
    fetchLoginRequest: (loginFields: any) => dispatch(actions.fetchLoginRequest(loginFields)),
    updateRegisterField: (event: any) => {
      // If input is a checkbox, payload is checked status, otherwise payload is value
      const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;
      return dispatch(actions.updateRegisterField({field: event.target.name, value: value}));
    },
    fetchRegisterRequest: (registerFields: any) => dispatch(actions.fetchRegisterRequest(registerFields)),
  }
}

let FormContainer: any = (props: any) => {

  //Destructure form values and actions from props
  const {
    match, 
    loginFields,
    fetchLoginRequest,
    updateLoginField,
    registerFields,
    fetchRegisterRequest,
    updateRegisterCheck,
    updateRegisterField,
  } = props;

  // Pass relevant field values and actions to Login and Registration Form Components
  return (
    <div>
      {match.params.id === 'login' ?
        (
          <div>
            <h1>Login Form</h1>
            <LoginForm
              loginFields={loginFields}
              fetchLoginRequest={fetchLoginRequest}
              updateLoginField={updateLoginField}
            />
          </div>
        )
        :
        (
          <div>
            <h1>Register Form</h1>
            <RegisterForm
              registerFields={registerFields}
              fetchRegisterRequest={fetchRegisterRequest}
              updateRegisterCheck={updateRegisterCheck}
              updateRegisterField={updateRegisterField}
            />
          </div>
        )
      }
    </div>
  )
}

// Connect FormContainer to Store
FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainer);
FormContainer = withRouter(FormContainer);
export default FormContainer;
