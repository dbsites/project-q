/**
 * @module Modal
 * @description Modal React Container
 */

import * as React from 'react';

import { Link } from 'react-router-dom';

import modalText from './modalText';
import Button from "../Button";
import ModalSpan from './ModalSpan';

import './Modal.css';

interface IModalProps {
  clearModal: () => any;
  modalType: string;
}

const Modal = (props: IModalProps) => {
  const {
    clearModal,
    modalType,
  } = props;
  let bodyText: string;
  let headerText: string;
  let buttonText: string;

  switch (modalType) {
    case 'reset':
      headerText = modalText.RESET_MODAL_HEADER_TEXT;
      bodyText = modalText.RESET_MODAL_BODY_TEXT;
      buttonText = modalText.RESET_BUTTON_TEXT;
      break;
    default:
      bodyText = '';
      headerText = '';
      buttonText = '';
  }

  return (
    <React.Fragment>
      <div className="modal-opacity" onClick={clearModal}></div>
      <div className="modal-outer">
        <div className="modal-inner">
          <ModalSpan header={true} >{headerText}</ ModalSpan>
          <ModalSpan header={false}>{bodyText}</ ModalSpan>
          <div className="modal-button-container">
            <Button className="modal-button" onClick={clearModal}>CANCEL</ Button>
            <Link to='/account/restart'><Button className="modal-button" onClick={clearModal}>{buttonText}</ Button></Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Modal;
