/**
 * ************************************
 *
 * @module  /repos/index.ts
 * @author Team Quail
 * @date 
 * @description interfaces for controllers holding functionality for querying database and general interfaces for server object typing
 *
 * ************************************
 */

// get the users repo which hold all the user data methods
import { UsersRepository } from './users';
import { CompanyRepository } from './company';
import { DatabaseRepository } from './data';

//interface for calling users in db/index.ts
interface IExtensions {
  users: UsersRepository,
  companies: CompanyRepository,
  data: DatabaseRepository
}
// interface for userdata object which holds email/pass and is used to login/register
interface userData {
  firstName: string,
  lastName: string,
  registerEmail: string,
  registerPassword: string,
  confirmPassword: string,
  agreeTerms: boolean,
}

// interface for userData object as it comes frm the db
interface userDataFromDb {
  id: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  agreeTerms: boolean,
  issues: any,
  remember: any,
}

// interface for each item in the array of company objects, not currently in use
interface CompanyDataInterface {
  ticker: string,
  companyName: string,
  blurb: string,
  link: string,  
}

// interface for userCookie
interface UserCookie {
  name: string,
  loggedIn: boolean,
}

interface Issues {
  economyScore: number,
  environmentScore: number,
  civilRightsScore: number,
  salaryGapScore: number,
  philanthropyScore: number,
  immigrationScore: number,
}

export {
  IExtensions,
  UsersRepository,
  userData,
  userDataFromDb,
  UserCookie,
  CompanyDataInterface,
  CompanyRepository,
  Issues,
  DatabaseRepository,
};
 