/**
 * ************************************
 *
 * @module  controllers/users.ts
 * @author Team Quail
 * @date 
 * @description methods to modify/create/access user data within the database
 *
 * ************************************
 */

// import pg-promise types and sql statements 
 import { IDatabase } from 'pg-promise';
 import { IResult } from 'pg-promise/typescript/pg-subset';
 import { userData } from './index';
 // import unique user id creation library
 import { v4 } from 'uuid';
 
 export class UsersRepository {
   
    constructor (db: any) {
      // database
      this.db = db;
    }

    private db: IDatabase<any>;

    // add a new user to the database
    // userData Interface imported on line 16
    add (userData: userData) {
      return this.db.none('INSERT INTO users (id, email, password, firstname, lastname, agreeterms, remember) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [v4(), userData.registerEmail, userData.confirmPassword, userData.firstName, userData.lastName, userData.agreeTerms, false]);
    }

    //delete a user from the database and returns the number of records deleted
    remove (email: string) {
      return this.db.result('DELETE FROM users WHERE email = $1', email, (r: IResult) => r.rowCount);
    }

    // find user by id
    findById (id: number) {
      return this.db.oneOrNone('SELECT * FROM users WHERE id = $1', +id);
    }

    // find user by email
    findByEmail (email: string) {
      return this.db.oneOrNone('SELECT * FROM users WHERE email = $1', email);
    }

    // update user to remembered or not
    rememberUser (email: string, remember: boolean) {
      return this.db.none('UPDATE users SET remember = $1 WHERE email = $2', [remember, email]);
    }
 }
