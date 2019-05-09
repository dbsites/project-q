/**
 * @module FormError.tsx
 * @description Login/Registration Form Error Presentation Component
 */

import * as React from 'react';

export interface IFormErrorProps {
  message: string;
}

const FormError = (props: IFormErrorProps): JSX.Element => {
  const { message } = props;
  if (message.length) {
    return <div className="form-error">{message}</div>
  }
  return <div className="form-error"></div>
}

export default FormError;
