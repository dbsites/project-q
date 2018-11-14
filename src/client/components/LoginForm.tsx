/**
 * @module LoginForm.tsx
 * @description User Login Form Presentation Component
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
    fetchFormRequest,
    updateField
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
    <div className="login-register-form" onKeyPress={(e) => {if (e.key === 'Enter') fetchFormRequest('login', loginFields)}}>
      
      <FormField autofocus={true} field={loginEmail} form="login" name="loginEmail" type="text" updateField={updateField} >Email: </FormField>
      <FormField autofocus={false} field={loginPassword} form="login" name="loginPassword" type="password" updateField={updateField} >Password: </FormField>
      <FormField field={rememberMe} form="login" name="rememberMe" type="checkbox" updateField={updateField} >Remember Me </FormField>
      <div className="submit-button-container">
        <div className="submit-button" onClick={() => fetchFormRequest('login', loginFields)}>Log In</div>
      </div>
      <div className="change-form-link">
        <Link to='/account/register'>Sign up</Link>
      </div>
    </div>
  )
}

export default LoginForm;
