/**
 * @module ForgotPass.tsx
 * @description User Forgot Password Presentation Form
 */

import * as React from 'react';
import { Link } from 'react-router-dom';
import FormError from './FormError';
import FormField from './FormField';

// TODO: Assign explicit type to props
// TODO: Look into update form / htmlForm?
const ResetPass: any = (props: any) => {
  // Destructure form values and actions from props
  const { fetchFormFail, fetchFormRequest, resetFields, updateField } = props;
  const { forgotPassEmail, emailValid, resetError } = resetFields;

  const callFetchFormRequest = (resetFields: any): any => {
    if (!emailValid) return fetchFormFail('reset', 'Please enter a valid email address');
    return fetchFormRequest('reset', resetFields)
  }

  return (
    <div className="input-form" onKeyPress={(e) => {if (e.key === 'Enter') fetchFormRequest('login', resetFields)}}>
      <div className="input-form-header">Forgot Your Password?</div>
      <div className="input-form-text">
        Enter the email address associated with your account.
        <br />
        We’ll email you a link to reset your password.
      </div>
      <FormField autofocus={true} field={forgotPassEmail} form="reset" name="forgotPassEmail" type="text" updateField={updateField} >Email: </FormField>
      <FormError message={resetError} />
      <div className="submit-button-container">
        <div className="submit-button" onClick={() => callFetchFormRequest(resetFields)}>Send Reset Link</div>
      </div>
      <div className="change-form-link">
        <Link to='/account/login'>Back To Login</Link>
      </div>
    </div>
  )
}

export default ResetPass;
