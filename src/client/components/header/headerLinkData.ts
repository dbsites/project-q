/**
 * @module headerLinkData.ts
 * @description List of Header Links
 */

interface IHeaderLinkData {
  [linkName: string]: {
    className: string,
    link: string,
    linkKey: string,
    linkText: string,
    modal: boolean,
    onClick?: () => any,
  }
}

export const headerLinkData: IHeaderLinkData = {
  logout: {
    className: 'header-right',
    link: '/account/logout',
    linkKey: 'logout',
    linkText: 'LOGOUT',
    modal: false,
  },
  restart: {
    className: 'header-right',
    link: '/account/logout',
    linkKey: 'restart',
    linkText: 'RESET',
    modal: true,
  },
  home: {
    className: 'header-right',
    link: '/',
    linkKey: 'home',
    linkText: 'HOME',
    modal: false,
  },
  register: {
    className: 'header-right',
    link: '/account/register',
    linkKey: 'register',
    linkText: 'REGISTER',
    modal: false,
  },
  login: {
    className: 'header-right',
    link: '/account/login',
    linkKey: 'login',
    linkText: 'LOGIN',
    modal: false,
  },
};
