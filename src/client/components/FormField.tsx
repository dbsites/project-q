/**
 * @module FormField.tsx
 * @description Form Field Presentation Component
 */

import * as React from 'react';

const FormField = (props: any): any => {
  const {
    children, field, name, type,  // state
    updateField,                  // dispatch
  } = props;

  // Declare input field
  let input = type !== 'checkbox' ?
  <input className="input-field" id={name} name={name} onChange={updateField} type={type} value={field} /> :  
  <input className="input-check" id={name} name={name} onChange={updateField} type={type} checked={field} />;


  // Declare label and warpper
  let label = type !== 'checkbox' ?
  <React.Fragment><label className="input-field-label" htmlFor={name}>{children} </label> {input}</React.Fragment>:  // case: default
  <React.Fragment><label className="input-check-label" htmlFor={name}>{children} {input} <span className="checkmark" /></label></React.Fragment>; // case: checkbox

  // Additional wrapping in case of name field
  if (name === 'firstName' || name === 'lastName') {
    label = <div className="input-field-name-wrapper">{label}</div>
  }

  return (
    label
  )
};

export default FormField;
