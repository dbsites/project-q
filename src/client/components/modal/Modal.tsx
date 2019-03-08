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
  let buttonAction: JSX.Element;

  switch (modalType) {
    case 'reset':
      headerText = modalText.RESET_MODAL_HEADER_TEXT;
      bodyText = modalText.RESET_MODAL_BODY_TEXT;
      buttonText = modalText.RESET_BUTTON_TEXT;
      buttonAction = <Link to='/account/restart'><Button className="modal-button" onClick={clearModal}>{buttonText}</ Button></Link>;
      break;
    case 'screen':
      headerText = modalText.SCREEN_MODAL_HEADER_TEXT;
      bodyText = modalText.SCREEN_MODAL_BODY_TEXT;
      buttonText = modalText.SCREEN_BUTTON_TEXT;
      buttonAction = <form onChange={clearModal}><label className="modal-button">{buttonText}<input className="modal-file-input" type="file"/></label></form>;
      break;
    default:
      bodyText = '';
      headerText = '';
      buttonText = '';
      buttonAction = <Button className="modal-button" onClick={clearModal}>{buttonText}</ Button>;
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
            {buttonAction}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Modal;
