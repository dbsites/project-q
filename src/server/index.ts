/**
 * ************************************
 *
 * @module  /db/index.ts
 * @author Team Quail
 * @date 
 * @description Module which sets the initialization options for pg-promise and instantiates the connection to the db uri
 *
 * ************************************
 */

// Native TS typing for pg-promise, no @types needed 
import { IMain, IDatabase, IOptions } from 'pg-promise';
import { IExtensions, UsersRepository, CompanyRepository, DatabaseRepository } from './controllers';
import * as dotenv from 'dotenv';
dotenv.config();
// pg-promise initialization options

const initOptions: IOptions<IExtensions> = {
  // extending the db protocol to incorporate a custom repo for user functions
  // this is where the functions for modifying user data within the database will be hosted
  extend(obj: IExtensions) {
    // user methods
    obj.users = new UsersRepository(obj);
    obj.companies = new CompanyRepository(obj);
    obj.data  = new DatabaseRepository(obj);
  }
}

// database configuration - links to Amazon RDS
const connection = {
  host: process.env.RDS_HOST as string,
  port: Number(process.env.RDS_PORT as string),
  database: process.env.RDS_DATABASE as string,
  user: process.env.RDS_USER as string,
  password: process.env.RDS_PASSWORD as string,
};

// load and initialize pg-promise
import * as pgPromise from 'pg-promise';

const pgp: IMain = pgPromise(initOptions);

// instantiate db instance with extensions included
const db = <IDatabase<IExtensions> & IExtensions>pgp(connection);

// export the db variable to access it throughout the application
export default db;
