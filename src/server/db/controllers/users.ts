/**
 * ************************************
 *
 * @module  repos/users.ts
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
      return this.db.none('INSERT INTO users (id, email, password) VALUES ($1, $2, $3)', [v4(), userData.email, userData.password]);
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
 }
