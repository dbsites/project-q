/**
 * @module ResetPass.tsx
 * @description User Password Reset Presentation Form
 */

import * as React from 'react';
import FormError from './FormError';
import FormField from './FormField';

// TODO: Assign explicit type to props
// TODO: Look into update form / htmlForm?
const ResetPass: any = (props: any) => {
  // Destructure form values and actions from props
  const { fetchFormFailure, fetchFormRequest, resetFields, updateField } = props;
  const { newPassword, confirmNewPassword, resetError } = resetFields;

  const callFetchFormRequest = (resetFields: any): any => {
    if (newPassword.length < 8) return fetchFormFailure('reset', 'Password must be at least 8 characters');
    if (newPassword !== confirmNewPassword) return fetchFormFailure('reset', 'Password must match Confirm Password');
    return fetchFormRequest('reset', resetFields)
  }

  if (!resetFields.resetPass) {
    updateField({
      form: "reset",
      field: "resetPass",
      type: "text",
      value: true,
    });
  }
  
  return (
    <div className="input-form" onKeyPress={(e) => {if (e.key === 'Enter') fetchFormRequest('login', resetFields)}}>
      <FormField autofocus={true} field={newPassword} form="reset" name="newPassword" type="password" updateField={updateField} >Password: </FormField>
      <FormField autofocus={false} field={confirmNewPassword} form="reset" name="confirmNewPassword" type="password" updateField={updateField} >Confirm Password: </FormField>
      <FormError message={resetError} />
      <div className="submit-button-container">
        <div className="submit-button" onClick={() => callFetchFormRequest(resetFields)}>Reset Password</div>
      </div>
    </div>
  )
}

export default ResetPass;
