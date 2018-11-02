/**
 * @module RegisterForm.tsx
 * @description User Registration Form Component
 */

import * as React from 'react';

import FormField from './FormField';
// import FormError from './FormError';

// TODO: Assign explicit type to props
// TODO: Look into update form / htmlForm?
const RegisterForm: any = (props: any) => {
  // Destructure form values and actions from props
  const {
    registerFields,
    fetchRegisterRequest,
    updateRegisterField
  } = props;
  const {
    firstName,
    lastName,
    registerEmail,
    registerPassword,
    confirmPassword,
    agreeTerms,
  } = registerFields;

  return (
    <div>
      <FormField field={firstName} name="firstName" type="text" updateField={updateRegisterField} >First Name: </FormField>
      <br />
      <FormField field={lastName} name="lastName" type="text" updateField={updateRegisterField} >Last Name: </FormField>
      <br />
      <FormField field={registerEmail} name="registerEmail" type="text" updateField={updateRegisterField} >Email: </FormField>
      <br />
      <FormField field={registerPassword} name="registerPassword" type="password" updateField={updateRegisterField} >Password: </FormField>
      <br />
      <FormField field={confirmPassword} name="confirmPassword" type="password" updateField={updateRegisterField} >Confirm Password: </FormField>
      <br />
      <FormField field={agreeTerms} name="agreeTerms" type="checkbox" updateField={updateRegisterField} >Agree Terms: </FormField>
      <br />
      <input onClick={() => fetchRegisterRequest(registerFields)} type="submit"/>
    </div>
  )
}

export default RegisterForm;
