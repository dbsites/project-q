/**
 * @module Button.tsx
 * @description Clickable Button
 */

import * as React from 'react';

interface ButtonProps {
  className: string,
  children: string,
  onClick: any, // TODO: Specify
}

const Button = (props: ButtonProps) => {
  const { className, onClick, children } = props
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  )
}

export default Button;
