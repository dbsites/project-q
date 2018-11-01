/**
 * @module LoginForm.tsx
 * @description User Login Form Component
 */

import * as React from 'react';
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

  return (
    <div>
      <FormField field={loginEmail} name="loginEmail" type="text" updateField={updateLoginField} >Email: </FormField>
      <br />
      <FormField field={loginPassword} name="loginPassword" type="password" updateField={updateLoginField} >Password: </FormField>
      <br />
      <FormField field={rememberMe} name="rememberMe" type="checkbox" updateField={updateLoginField} >Remember Me: </FormField>
      <br />
      <input onClick={() => fetchLoginRequest(loginFields)} type="submit"/>
    </div>
  )
}

export default LoginForm;
