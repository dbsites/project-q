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
import ForgotPass from '../components/ForgotPass'
import ResetPass from '../components/ResetPass'; 
import { formFieldObject } from '../actions/types';
import { LoginState, RegisterState } from '../reducers/types';
import FormHeader from '../components/FormHeader';

// TODO: Assign explicit type to store
// Extract form values from store to pass as props
const mapStateToProps = (store: any): any => ({
  loginFields: {
    emailValid: store.form.login.emailValid,
    loginEmail: store.form.login.loginEmail,
    loginPassword: store.form.login.loginPassword,
    rememberMe: store.form.login.rememberMe,
    loginError: store.form.login.loginError,
  },
  registerFields: {
    emailValid: store.form.register.emailValid,
    firstName: store.form.register.firstName,
    lastName: store.form.register.lastName,
    registerEmail: store.form.register.registerEmail,
    registerPassword: store.form.register.registerPassword,
    confirmPassword: store.form.register.confirmPassword,
    agreeTerms: store.form.register.agreeTerms,
    registerError: store.form.register.registerError,
  },
  resetFields: {
    resetPass: store.form.reset.resetPass,
    forgotPassEmail: store.form.reset.forgotPassEmail,
    newPassword: store.form.reset.newPassword,
    confirmNewPassword: store.form.reset.confirmNewPassword,
    resetError: store.form.reset.resetError,
  },
  isAuth: store.user.isAuth,
  userId: store.user.userId,
});

// TODO: Assign explicit type to dispatch
// TODO: Explicit type to event

// Extract form update and submit actions from store to pass as props
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateField: (fieldObject: formFieldObject) => dispatch(actions.updateField(fieldObject)),
    fetchFormFail: (form: string, message: string) => dispatch(actions.fetchFormFail(form, message)),
    fetchFormRequest: (form: string, formFields: LoginState | RegisterState) => dispatch(actions.fetchFormRequest(form, formFields)),
    fetchLogout: (userId: string) => dispatch(actions.fetchLogout(userId)),
  }
}

let FormContainer: any = (props: any) => {

  //Destructure form values and actions from props
  const {
    match, 
    loginFields, registerFields, resetFields,
    fetchFormFail, fetchFormRequest,
    updateField,
    fetchLogout,
    isAuth, userId,
  } = props;

  const loginForm = <LoginForm
      loginFields={loginFields}
      fetchFormFail={fetchFormFail}
      fetchFormRequest={fetchFormRequest}
      updateField={updateField}
    />;

  const registerForm = <RegisterForm
      registerFields={registerFields}
      fetchFormFail={fetchFormFail}
      fetchFormRequest={fetchFormRequest}
      updateField={updateField}
    />

  const forgotPassForm = <ForgotPass
    fetchFormFail={fetchFormFail}
    fetchFormRequest={fetchFormRequest}
    resetFields={resetFields}
    updateField={updateField}
  />

  const resetPassForm = <ResetPass
    fetchFormFail={fetchFormFail}
    fetchFormRequest={fetchFormRequest}
    resetFields={resetFields}
    updateField={updateField}
  />

  let displayForm;
  
  if (match.params.form === 'logout') {
    fetchLogout(userId);
    return <Redirect to='/account/login' />
  }
  
  if (match.params.form === 'login') {
    displayForm = loginForm;
  } else if (match.params.form === 'register') {
    displayForm = registerForm;
  } else if (match.params.form === 'forgot') {
    displayForm = forgotPassForm;
  }else if (match.params.form === 'reset') {
    displayForm = resetPassForm;
  }

  // Redirect if user is authenticated
  const authRedirect = isAuth ? <Redirect to='/'/> : '';

  // Pass relevant field values and actions to Login and Registration Form Components
  return (
    <div className="form-dashboard">
      {authRedirect}
      <FormHeader />
      <div className="form-container">
        {displayForm}
      </div>
    </div>
  )
}

// Connect FormContainer to Store
FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainer);
FormContainer = withRouter(FormContainer);
export default FormContainer;
