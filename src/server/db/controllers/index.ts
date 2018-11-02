/**
 * ************************************
 *
 * @module  /repos/index.ts
 * @author Team Quail
 * @date 
 * @description interfaces for repos holding functionality for querying database and general interfaces for server object typing
 *
 * ************************************
 */

// get the users repo which hold all the user data methods
import {UsersRepository} from './users';
import { CompanyRepository } from './company';

//interface for calling users in db/index.ts
interface IExtensions {
  users: UsersRepository,
  companies: CompanyRepository,
}
// interface for userdata object which holds email/pass and is used to login/register
interface userData {
  email: string,
  password: string,
}

interface CompanyDataInterface {
  ticker: string,
  companyName: string,
  blurb: string,
  link: string,
  
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
  CompanyDataInterface,
  CompanyRepository,
  Issues,
};
 