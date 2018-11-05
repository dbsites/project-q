/**
 * @module FormContainer.tsx
 * @description Form Container for Login/Register Forms
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom'; // Access route params

import * as actions from '../actions/actionCreators'

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

// TODO: Assign explicit type to store
// Extract form values from store to pass as props
const mapStateToProps = (store: any): any => ({
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
const mapDispatchToProps = (dispatch: any) => {
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
    logoutUser: () => dispatch(actions.logoutUser()),
  }
}

let FormContainer: any = (props: any) => {

  //Destructure form values and actions from props
  const {
    match, 
    loginFields, registerFields,
    fetchLoginRequest, fetchRegisterRequest,
    updateLoginField, updateRegisterField,
    logoutUser,
  } = props;

  const loginForm = <LoginForm
      loginFields={loginFields}
      fetchLoginRequest={fetchLoginRequest}
      updateLoginField={updateLoginField}
    />;

  const registerForm = <RegisterForm
      registerFields={registerFields}
      fetchRegisterRequest={fetchRegisterRequest}
      updateRegisterField={updateRegisterField}
    />

  let displayForm;
  
  if (match.params.id === 'logout') {
    logoutUser();
    return <Redirect to='/account/login' />
  }
  
  if (match.params.id === 'login') {
    displayForm = loginForm;
  } else if (match.params.id === 'register') {
    displayForm = registerForm;
  }

  // Pass relevant field values and actions to Login and Registration Form Components
  return (
    <div className="form-container">
      {displayForm}
    </div>
  )
}

// Connect FormContainer to Store
FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainer);
FormContainer = withRouter(FormContainer);
export default FormContainer;
