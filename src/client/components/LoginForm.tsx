/**
 * @module LoginForm.tsx
 * @description User Login Form Presentation Component
 */

import * as React from 'react';
import { Link } from 'react-router-dom';
import FormError from './FormError';
import FormField from './FormField';

// import FormError from './FormError';

// TODO: Assign explicit type to props
// TODO: Look into update form / htmlForm?
const LoginForm: any = (props: any) => {
  // Destructure form values and actions from props
  const {
    loginFields,
    fetchFormFail,
    fetchFormRequest,
    updateField
  } = props;

  const {
    loginError,
    emailValid,
    loginEmail,
    loginPassword,
    rememberMe,
  } = loginFields;

  const callFetchFormRequest = (loginFields: any): any => {
    if (!emailValid) return fetchFormFail('login', 'Please enter a valid email address');
    if (loginPassword.length < 8) return fetchFormFail('login', 'Password must be at least 8 characters');
    return fetchFormRequest('login', loginFields)
  }

  return (
    <div className="login-register-form" onKeyPress={(e) => {if (e.key === 'Enter') fetchFormRequest('login', loginFields)}}>
      
      <FormField autofocus={true} field={loginEmail} form="login" name="loginEmail" type="text" updateField={updateField} >Email: </FormField>
      <FormField autofocus={false} field={loginPassword} form="login" name="loginPassword" type="password" updateField={updateField} >Password: </FormField>
      <FormField field={rememberMe} form="login" name="rememberMe" type="checkbox" updateField={updateField} >Remember Me </FormField>
      <FormError message={loginError} />
      <div className="submit-button-container">
        <div className="submit-button" onClick={() => callFetchFormRequest(loginFields)}>Log In</div>
      </div>
      <div className="change-form-link">
        <Link to='/account/register'>Sign up</Link>
      </div>
    </div>
  )
}

export default LoginForm;
