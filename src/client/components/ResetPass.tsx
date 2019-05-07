/**
 * @module ResetPass.tsx
 * @description User Password Reset Presentation Form
 */

import * as React from 'react';
import FormError from './FormError';
import FormField from './FormField';
import { Redirect } from 'react-router-dom';

// TODO: Assign explicit type to props
// TODO: Look into update form / htmlForm?
const ResetPass: any = (props: any) => {
  // Destructure form values and actions from props
  const { fetchFormFailure, fetchForm, formLoading, resetFields, updateField } = props;
  const { newPassword, confirmNewPassword, resetError } = resetFields;

  const callFetchForm = (resetFields: any): any => {
    if (newPassword.length < 8) return fetchFormFailure('reset', 'Password must be at least 8 characters');
    if (newPassword !== confirmNewPassword) return fetchFormFailure('reset', 'Password must match Confirm Password');
    return fetchForm('reset', resetFields)
  }

  if (formLoading) return <Redirect to='/account/login' push={true} />;

  return (
    <div className="input-form" onKeyPress={(e) => {if (e.key === 'Enter') fetchForm('login', resetFields)}}>
      <FormField autofocus={true} field={newPassword} form="reset" name="newPassword" type="password" updateField={updateField} >Password: </FormField>
      <FormField autofocus={false} field={confirmNewPassword} form="reset" name="confirmNewPassword" type="password" updateField={updateField} >Confirm Password: </FormField>
      <FormError message={resetError} />
      <div className="submit-button-container">
        <div className="submit-button" onClick={() => callFetchForm(resetFields)}>Reset Password</div>
      </div>
    </div>
  )
}

export default ResetPass;
