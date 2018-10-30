/**
 * @module FormContainer.tsx
 * @description Form Container for Login/Register Forms
 */

import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actionCreators'

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

// TODO: Assign explicit type to store
// Extract form values from store to pass as props
const mapStateToProps: any = (store: any) => ({
  loginEmail: store.login.loginEmail,
  loginPassword: store.login.loginPassword,
  rememberMe: store.login.rememberMe,
  firstName: store.register.firstName,
  lastName: store.register.lastName,
  registerEmail: store.register.registerEmail,
  registerPassword: store.register.registerPassword,
  confirmPassword: store.register.confirmPassword,
  agreeTerms: store.register.agreeTerms,
});

// TODO: Assign explicit type to dispatch
// TODO: Explicit type to event
// Extract form update and submit actions from store to pass as props
const mapDispatchToProps: any = (dispatch: any) => {
  return {
    updateLoginCheck: (event: any) => dispatch(actions.updateLoginCheck({field: event.target.name, value: event.target.checked})),
    updateLoginField: (event: any) => dispatch(actions.updateLoginField({field: event.target.name, value: event.target.value})),
    submitLogin: () => dispatch(actions.submitLogin()),
    updateRegisterCheck: (event: any) => dispatch(actions.updateRegisterCheck({field: event.target.name, value: event.target.checked})),
    updateRegisterField: (event: any) => dispatch(actions.updateRegisterField({field: event.target.name, value: event.target.value})),
    submitRegister: () => dispatch(actions.submitLogin()),
  }
}

const FormContainer: any = (props: any) => {
  // Destructure form values and actions from props
  const {
    loginEmail,
    loginPassword,
    rememberMe,
    submitLogin,
    updateLoginCheck,
    updateLoginField,
    firstName,
    lastName,
    registerEmail,
    registerPassword,
    confirmPassword,
    agreeTerms,
    updateRegisterCheck,
    updateRegisterField,
    submitRegister,
  } = props;

  // Pass relevant field values and actions to Login and Registration Form Components
  return (
    <div>
      <h1>Login Form</h1>
      <LoginForm
        loginEmail={loginEmail}
        loginPassword={loginPassword}
        rememberMe={rememberMe}
        submitLogin={submitLogin}
        updateLoginCheck={updateLoginCheck}
        updateLoginField={updateLoginField}
      />
      <h1>Register Form</h1>
      <RegisterForm
        firstName={firstName}
        lastName={lastName}
        registerEmail={registerEmail}
        registerPassword={registerPassword}
        confirmPassword={confirmPassword}
        agreeTerms={agreeTerms}
        submitRegister={submitRegister}
        updateRegisterCheck={updateRegisterCheck}
        updateRegisterField={updateRegisterField}
      />
    </div>
  )
}

// Connect FormContainer to Store
export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
