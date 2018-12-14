/**
 * @module Header.tsx
 * @description Application Header Container
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../components/logo/Logo';

let Header = (props: any) => {

  // Header Links depend on user auth status
  const headerRight = [];
  if (props.isAuth) {
    headerRight.push(<li className="header-right" key="logout"><Link to='/account/logout'>LOGOUT</Link></li>);
    headerRight.push(<li className="header-right" key="restart"><Link to='/account/restart'>RESET</Link></li>);
    headerRight.push(<li className="header-right" key="home"><Link to='/'>HOME</Link></li>);
  } else {
    headerRight.push(<li className="header-right" key="register"><Link to='/account/register'>REGISTER</Link></li>);
    headerRight.push(<li className="header-right" key="login"><Link to='/account/login'>LOGIN</Link></li>);
  }

  return (
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
  );
};

// mapStatetoProps to access user auth status
const mapStateToProps = (state: any) => {
  return {
    isAuth: state.user.isAuth,
  }
}

export default connect(mapStateToProps, null)(Header);
