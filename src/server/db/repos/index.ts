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

 //interface for calling users in db/index.ts
 interface IExtensions {
   users: UsersRepository,
 }

 // interface for userdata object which holds email/pass and is used to login/register
 interface userData {
   email: string,
   password: string,
 }

 export {
   IExtensions,
   UsersRepository,
   userData
 };
 