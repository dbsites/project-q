/**
 * @module LoginForm.tsx
 * @description User Login Form Component
 */

import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import FormField from './FormField';

// import FormError from './FormError';

// TODO: Assign explicit type to props
// TODO: Look into update form / htmlForm?
const LoginForm: any = (props: any) => {
  // Destructure form values and actions from props
  const {
    loginFields,
    fetchLoginRequest,
    updateLoginField
  } = props;
  const {
    loginEmail,
    loginPassword,
    rememberMe,
  } = loginFields;

  // Check for cookie - if present, log user in
  if (document.cookie) {
    const cookieArray = document.cookie.split(';');
    for (let item of cookieArray) {
      let itemString = item.trim();
      if(itemString.startsWith('key=')) {
        return <Redirect to='/' />;
      }
    }
  }

  return (
    <div className="login-register-form">
      <h2>Sign in to your account</h2> 
      <div className="change-form-link">Don't have an account? <Link to='/account/register'>Sign up</Link></div>
      <FormField field={loginEmail} name="loginEmail" type="text" updateField={updateLoginField} >Email </FormField>
      <br />
      <FormField field={loginPassword} name="loginPassword" type="password" updateField={updateLoginField} >Password </FormField>
      <br />
      <FormField field={rememberMe} name="rememberMe" type="checkbox" updateField={updateLoginField} >Remember Me </FormField>
      <br />
      <input className="submit-button" onClick={() => fetchLoginRequest(loginFields)} type="submit"/>
    </div>
  )
}

export default LoginForm;
