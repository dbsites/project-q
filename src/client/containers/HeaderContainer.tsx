/**
 * @module Header.tsx
 * @description Application Header Container
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../components/logo/Logo';
import Modal from '../components/modal/Modal';

import * as actions from './../actions/actionCreators';

let Header = (props: any) => {
  const {
    isAuth, isModalActive, modalType,
    clearModal, setModal
  } = props;
  // Header Links depend on user auth status
  const headerRight = [];
  if (isAuth) {
    headerRight.push(<li className="header-right" key="logout"><Link to='/account/logout'>LOGOUT</Link></li>);
    // headerRight.push(<li className="header-right" key="restart" onClick={props.setModal('error')}><Link to='/'>RESET</Link></li>);
    headerRight.push(<li className="header-right" key="restart" onClick={() => setModal('reset')}>RESET</li>);
    headerRight.push(<li className="header-right" key="home"><Link to='/'>HOME</Link></li>);
  } else {
    headerRight.push(<li className="header-right" key="register"><Link to='/account/register'>REGISTER</Link></li>);
    headerRight.push(<li className="header-right" key="login"><Link to='/account/login'>LOGIN</Link></li>);
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
