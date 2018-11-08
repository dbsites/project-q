/**
 * @module FormField.tsx
 * @description Login/Registration Form Field Presentation Component
 */

import * as React from 'react';

const FormField = (props: any): any => {
  const {
    children, field, form, name, type,  // state
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
  let input = type !== 'checkbox' ?
  <input className="input-field" id={name} name={name} onChange={callUpdateField} type={type} value={field} /> :  
  <input className="input-check" id={name} name={name} onChange={callUpdateField} type={type} checked={field} />;


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
