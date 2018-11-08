/**
 * @module RegisterForm.tsx
 * @description User Registration Form Presentation Component
 */

import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import FormField from './FormField';
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

  return (
    <div className="login-register-form" onKeyPress={(e) => {if (e.key === 'Enter') fetchFormRequest('register', registerFields)}} >
      <FormField field={firstName} form="register" name="firstName" type="text" updateField={updateField} >First Name: </FormField>
      <FormField field={lastName} form="register" name="lastName" type="text" updateField={updateField} >Last Name: </FormField>
      <FormField field={registerEmail} form="register" name="registerEmail" type="text" updateField={updateField} >Email: </FormField>
      <FormField field={registerPassword} form="register" name="registerPassword" type="password" updateField={updateField} >Password: </FormField>
      <FormField field={confirmPassword} form="register" name="confirmPassword" type="password" updateField={updateField} >Confirm Password: </FormField>
      <FormField field={agreeTerms} form="register" name="agreeTerms" type="checkbox" updateField={updateField} >I have read and agree to the Terms of Service</FormField>
      <div className="submit-button-container">
        <div className="submit-button" onClick={() => fetchFormRequest('register', registerFields)}>Create Account</div>
        <div className="change-form-link">Already have an account? <Link to='/account/login'>Log In</Link></div>
      </div> 
    </div>
  )
}

export default RegisterForm;
