/**
 * @module FormField.tsx
 * @description Login/Registration Form Field Presentation Component
 */

import * as React from 'react';

const FormField = (props: any): any => {
  const {
    children, autofocus, field, form, name, type,  // state
    updateField,                        // dispatch
  } = props;

  // Declare helper function to generate payload object
  const callUpdateField = (event: any): void => {
    const value: string = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const payload = {
      form,
      field: event.target.name,
      type: event.target.type,
      value,
    };
    updateField(payload);
  }

  // Declare input field
  const input: JSX.Element = type !== 'checkbox' ?
  <input autoFocus={autofocus} className="input-field" id={name} name={name} onChange={callUpdateField} type={type} value={field} /> :  
  <input className="input-check" id={name} name={name} onChange={callUpdateField} type={type} checked={field} />;


  // Declare label and warpper
  let label = type !== 'checkbox' ?
  <div className="input-div"><label className="input-field-label" htmlFor={name}>{children} </label> {input}</div>:  // case: default
  <div className="input-check-div"><label className="input-check-label" htmlFor={name}>{children} {input} <span className="checkmark" /></label></div>; // case: checkbox

  // Additional wrapping in case of name field
  if (name === 'firstName' || name === 'lastName') {
    label = <div className="input-field-name-wrapper">{label}</div>
  }

  return (
    label
  )
};

export default FormField;
