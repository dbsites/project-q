/**
 * ************************************
 *
 * @module  /db/index.ts
 * @author Team Quail
 * @date 
 * @description Modular storage for database credentials
 *
 * ************************************
 */

// Native TS typing for pg-promise, no @types needed 
import {IMain, IDatabase, IOptions} from 'pg-promise';
import {IExtensions, UsersRepository} from './repos';

// pg-promise initialization options

const initOptions: IOptions<IExtensions> = {
  // extending the db protocol to incorporate a custom repo for user functions
  //  this is where the functions for modifying user data within the database will be hosted
  extend(obj: IExtensions) {
    obj.users = new UsersRepository(obj, pgp);
  }

}

// database connection uri, currently links to elephantsql db
const config: string = 'postgres://opftgwkw:fjvQmMKLmr7W01ETUBvu8I1QuOJskqfU@nutty-custard-apple.db.elephantsql.com:5432/opftgwkw';

// load and initialize pg-promise
import * as pgPromise from 'pg-promise';

const pgp: IMain = pgPromise(initOptions);

// instantiate db instance with extensions included
const db = <IDatabase<IExtensions> & IExtensions>pgp(config);

// export the db variable to access it throughout the application
export default db;
