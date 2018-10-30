/**
 * @module RegisterForm.tsx
 * @description User Registration Form Component
 */

import * as React from 'react';

// TODO: Assign explicit type to props
// TODO: Look into update form / htmlForm?
const RegisterForm: any = (props: any) => {
  // Destructure form values and actions from props
  const {
    firstName,
    lastName,
    registerEmail,
    registerPassword,
    confirmPassword,
    agreeTerms,
    submitRegister,
    updateRegisterCheck,
    updateRegisterField
  } = props;

  return (
    <div>
      <label htmlFor="firstName">First Name: </label>
      <input id="firstName" name="firstName" onChange={updateRegisterField} type="text" value={firstName} />
      <br />
      <label htmlFor="lastName">Last Name: </label>
      <input id="lastName" name="lastName" onChange={updateRegisterField} type="text" value={lastName} />
      <br />
      <label htmlFor="registerEmail">Email: </label>
      <input id="registerEmail" name="registerEmail" onChange={updateRegisterField} type="text" value={registerEmail} />
      <br />
      <label htmlFor="registerPassword">Password: </label>
      <input id="registerPassword" name="registerPassword" onChange={updateRegisterField} type="password" value={registerPassword} />
      <br />
      <label htmlFor="confirmPassword">Confirm Password: </label>
      <input id="confirmPassword" name="confirmPassword" onChange={updateRegisterField} type="password" value={confirmPassword} />
      <br />
      <input id="agreeTerms" name="agreeTerms" onChange={updateRegisterCheck} type="checkbox" checked={agreeTerms} />
      <label htmlFor="agreeTerms">Agree Terms </label>
      <br />
      <input onClick={submitRegister} type="submit"/>
    </div>
  )
}

export default RegisterForm;
