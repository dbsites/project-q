/**
 * @module HeaderModal.tsx
 * @description Application Header Link to Modal Presentation Component
 * UNIT TEST COVERAGE - 100%
 */

import * as React from 'react';

export interface HeaderModalProps {
  className: string,
  linkKey: string,
  children: string,
  onClick: () => any,
}

const HeaderModal = (props: HeaderModalProps): JSX.Element => {
  const { className, linkKey, onClick, children } = props;
  return (
    <li className={className} key={linkKey} onClick={onClick}>{children}</li>
  )
}

export default HeaderModal;
