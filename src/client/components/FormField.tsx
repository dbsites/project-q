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
  const input = type === 'checkbox' ?
  <input id={name} name={name} onChange={updateField} type={type} checked={field} /> :  // case: checkbox
  <input id={name} name={name} onChange={updateField} type={type} value={field} />;     // case: default


  return (
    <React.Fragment>
      <label htmlFor={name}>{children} </label>
      {input}
    </React.Fragment>
  )
};

export default FormField;
