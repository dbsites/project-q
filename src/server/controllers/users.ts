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

    // add users selected issues
    async addIssues (user: string, issues: any) {
      // check to see if there is user data in the db
      this.db.any('SELECT * FROM "userIssues" WHERE "user" = $1;', [user])
      .then((issueData: any) => {
        // if there is no data, store some data
        if (issueData.length === 0) {
          const arrayOfIssues: any[] = Object.keys(issues);
         
          arrayOfIssues.forEach((issueId: any) => {
              this.db.none('INSERT INTO "userIssues" (id, "user", issue, bias) VALUES ($1, $2, $3, $4);', 
              [v4(), user, issueId, undefined])
              .then(() => {
                console.log('ISSUES STORED');
              })
              .catch((error: any) => {
                console.log('ERROR ADDING ISSUE TO userIssues IN users.ts', error);
              })
            })
        }
      })
    }

    // get the user issues out of the db
    getIssues(user: any) {
      return this.db.any('SELECT * FROM "userIssues" WHERE "user" = (SELECT id FROM users WHERE email = $1);', [user]);
    }

    // get questons for users to answer from db
    async getQuestions(issues: any) {
      const issueArray = Object.keys(issues);
      let questionsToSendToFrontEnd: any = {};

      for(let index = 0; index < issueArray.length; index += 1) {
        await this.db.any('SELECT id, "issueId", question, bias FROM questions WHERE "issueId" = $1;', [issueArray[index]])
        .then((questionData: any) => {
          let questionDataObject: any = {}

          questionData.forEach((questionDataReturned:any) => {
            questionDataObject.questionId = questionDataReturned.id;
            questionDataObject.questionText = questionDataReturned.question;
            questionDataObject.bias = questionDataReturned.bias;
          })

          questionsToSendToFrontEnd[issueArray[index]] = questionDataObject;
        })
        .catch((error: any) => {
          console.log('ERROR QUERYING FOR questionData in user.ts', error);
        })
      }
    
      return questionsToSendToFrontEnd;
    }
 }
