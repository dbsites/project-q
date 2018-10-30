/**
 * @module LoginForm.tsx
 * @description User Login Form Component
 */

import * as React from 'react';

// TODO: Assign explicit type to props
// TODO: Look into update form / htmlForm?
const LoginForm: any = (props: any) => {
  // Destructure form values and actions from props
  const {
    loginEmail,
    loginPassword,
    rememberMe,
    submitLogin,
    updateLoginCheck,
    updateLoginField
  } = props;
  
  return (
    <div>
      <label htmlFor="loginEmail">Email: </label>
      <input id="loginEmail" name="loginEmail" onChange={updateLoginField} type="text" value={loginEmail} />
      <br />
      <label htmlFor="loginPassword">Password: </label>
      <input id="loginPassword" name="loginPassword" onChange={updateLoginField} type="password" value={loginPassword} />
      <br />
      <input id="rememberMe" name="rememberMe" onChange={updateLoginCheck} type="checkbox" checked={rememberMe} />
      <label htmlFor="rememberMe">Remember Me </label>
      <br />
      <input onClick={submitLogin} type="submit"/>
    </div>
  )
}

export default LoginForm;
