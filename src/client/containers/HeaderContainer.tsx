/**
 * @module Header.tsx
 * @description Application Header Container
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderLink from '../components/header/HeaderLink';
import Logo from '../components/logo/Logo';
import Modal from '../components/modal/Modal';

import * as actions from './../actions/actionCreators';
import { headerLinkData } from '../components/header/headerLinkData';
import HeaderModal from '../components/header/HeaderModal';

let Header = (props: any) => {
  const {
    isAuth, isModalActive, modalType,
    clearModal, setModal
  } = props;
  const {logout, restart, home, register, login, screen} = headerLinkData;
  // Header Links depend on user auth status
  const headerRight = [];
  if (isAuth) {
    headerRight.push(<HeaderLink key={1} className={logout.className} linkKey={logout.linkKey} linkRoute={logout.linkRoute as string}>{logout.linkText}</HeaderLink>);
    headerRight.push(<HeaderModal key={2} className={restart.className} linkKey={restart.linkKey} onClick={() => setModal('reset')}>{restart.linkText}</HeaderModal>);
    headerRight.push(<HeaderLink key={3} className={home.className} linkKey={home.linkKey} linkRoute={home.linkRoute as string}>{home.linkText}</HeaderLink>);
    headerRight.push(<HeaderModal key={4} className={screen.className} linkKey={screen.linkKey} onClick={() => setModal('screen')}>{screen.linkText}</HeaderModal>);
  } else {
    headerRight.push(<HeaderLink key={1} className={register.className} linkKey={register.linkKey} linkRoute={register.linkRoute as string}>{register.linkText}</HeaderLink>);
    headerRight.push(<HeaderLink key={2} className={login.className} linkKey={login.linkKey} linkRoute={login.linkRoute as string}>{login.linkText}</HeaderLink>);
  }

  // set modal if modal active
  const modal = !isModalActive ?
    [] :
    <Modal clearModal={clearModal} modalType={modalType} />;

  return (
    <React.Fragment>
      {modal}
      <div>
        <ul className="header">
          <li className="header-left">
            <Link to='/'>
              <Logo className="header-logo-image" />
            </Link>
          </li>
          {headerRight}
        </ul>
      </div>
    </ React.Fragment>
  );
};

// mapStatetoProps to access user auth status
const mapStateToProps = (state: any) => {
  return {
    isAuth: state.user.isAuth,
    isModalActive: state.modal.isModalActive,
    modalType: state.modal.modalType,
  }
}

// mapDispatchtoProps to access setModal
const mapDispatchToProps = (dispatch: any) => {
  return {
    clearModal: () => dispatch(actions.clearModal()),
    setModal: (modalType: string) => dispatch(actions.setModal(modalType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
