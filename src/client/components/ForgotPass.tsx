/**
 * @module ForgotPass.tsx
 * @description User Forgot Password Presentation Form
 */

import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import FormError from './FormError';
import FormField from './FormField';

// TODO: Assign explicit type to props
// TODO: Look into update form / htmlForm?
const ForgotPass: any = (props: any) => {
  // Destructure form values and actions from props
  const { fetchFormFailure, fetchForm, formLoading, forgotFields, updateField } = props;
  const { forgotPassEmail, emailValid, forgotError } = forgotFields;

  const callFetchForm = (forgotFields: any): any => {
    if (!emailValid) return fetchFormFailure('forgot', 'Please enter a valid email address');
    return fetchForm('forgot', forgotFields)
  }

  if (formLoading) return <Redirect to='/account/login' push={true} />;

  return (
    <div className="input-form" onKeyPress={(e) => {if (e.key === 'Enter') fetchForm('login', forgotFields)}}>
      <div className="input-form-header">Forgot Your Password?</div>
      <div className="input-form-text">
        Enter the email address for your account.
        <br />
        We’ll email you a link to reset your password.
      </div>
      <FormField autofocus={true} field={forgotPassEmail} form="forgot" name="forgotPassEmail" type="text" updateField={updateField} >Email: </FormField>
      <FormError message={forgotError} />
      <div className="submit-button-container">
        <div className="submit-button" onClick={() => callFetchForm(forgotFields)}>Send Reset Link</div>
      </div>
      <div className="change-form-link">
        <Link to='/account/login'>Back To Login</Link>
      </div>
    </div>
  )
}

export default ForgotPass;
