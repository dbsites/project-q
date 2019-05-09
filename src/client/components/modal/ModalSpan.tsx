/**
 * @module ModalSpan
 * @description Modal Span React Component
 */

import * as React from 'react';

interface IModalSpanProps {
  children: string;
  header: boolean
};

const ModalSpan = (props: IModalSpanProps): JSX.Element => {
  const { children, header } = props;
  const spanClass = header ? 'modal-header-text' : 'modal-body-text';
  return (
    <span className={spanClass}>
      {children}
    </span>
  );
};

export default ModalSpan;
