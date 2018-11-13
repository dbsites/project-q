/**
 * @module RegisterForm.tsx
 * @description User Registration Form Presentation Component
 */

import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import FormField from './FormField';
import FormError from './FormError';
// import FormError from './FormError';

// TODO: Assign explicit type to props
// TODO: Look into update form / htmlForm?
const RegisterForm: any = (props: any) => {
  // Destructure form values and actions from props
  const {
    registerFields,
    fetchFormRequest,
    updateField
  } = props;
  const {
    firstName,
    lastName,
    registerEmail,
    registerPassword,
    confirmPassword,
    agreeTerms,
    registerError,
  } = registerFields;

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

  const callFetchFormRequest = (registerFields: any): any => {
    return fetchFormRequest('register', registerFields)
  }

  return (
    <div className="login-register-form" onKeyPress={(e) => {if (e.key === 'Enter') fetchFormRequest('register', registerFields)}} >
      <FormField autofocus={true} field={firstName} form="register" name="firstName" type="text" updateField={updateField} >First Name: </FormField>
      <FormField autofocus={false} field={lastName} form="register" name="lastName" type="text" updateField={updateField} >Last Name: </FormField>
      <FormField autofocus={false} field={registerEmail} form="register" name="registerEmail" type="text" updateField={updateField} >Email: </FormField>
      <FormField autofocus={false} field={registerPassword} form="register" name="registerPassword" type="password" updateField={updateField} >Password: </FormField>
      <FormField autofocus={false} field={confirmPassword} form="register" name="confirmPassword" type="password" updateField={updateField} >Confirm Password: </FormField>
      <FormField field={agreeTerms} form="register" name="agreeTerms" type="checkbox" updateField={updateField} >I have read and agree to the Terms of Service</FormField>
      <FormError message={registerError} />
      <div className="submit-button-container">
        <div className="submit-button" onClick={() => callFetchFormRequest(registerFields)}>Create Account</div>
      </div>
      <div className="change-form-link">
        <Link to='/account/login'>Log In</Link>
      </div>
    </div>
  )
}

export default RegisterForm;
