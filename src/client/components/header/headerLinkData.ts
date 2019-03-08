/**
 * @module headerLinkData.ts
 * @description List of Header Links
 */

interface IHeaderLinkData {
  [linkName: string]: {
    className: string,
    linkKey: string,
    linkRoute?: string,
    linkText: string,
  }
}

export const headerLinkData: IHeaderLinkData = {
  logout: {
    className: 'header-right',
    linkKey: 'logout',
    linkRoute: '/account/logout',
    linkText: 'LOGOUT',
  },
  restart: {
    className: 'header-right',
    linkKey: 'restart',
    linkText: 'RESET',
  },
  screen: {
    className: 'header-right-screen',
    linkKey: 'screen',
    linkText: 'SCREEN YOUR PORTFOLIO',
  },
  home: {
    className: 'header-right',
    linkKey: 'home',
    linkRoute: '/',
    linkText: 'HOME',
  },
  register: {
    className: 'header-right',
    linkKey: 'register',
    linkRoute: '/account/register',
    linkText: 'REGISTER',
  },
  login: {
    className: 'header-right',
    linkKey: 'login',
    linkRoute: '/account/login',
    linkText: 'LOGIN',
  },
};
