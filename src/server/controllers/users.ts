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
      return this.db.oneOrNone('SELECT * FROM users WHERE id = $1', id);
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
      // check to see if there is user data in the db, in order to not store duplicate values
      this.db.any('SELECT * FROM "userIssues" WHERE "user" = $1;', [user])
      .then((issueData: any) => {
        // if there is no data, store some data
        if (issueData.length === 0) {
          // create an array out of the issues object to query with
          const arrayOfIssues: any[] = Object.keys(issues);
         
          // use the array to insert each user selected issue into the userIssues table
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
      // create an array of issues from the issue object
      const issueArray = Object.keys(issues);
      // prep a variable to hold the question objects related to teh issues
      let questionsToSendToFrontEnd: any = {};

      // iterate through the issueArray (AWAIT GAVE "forEach" PROBLEMS)
      for(let index = 0; index < issueArray.length; index += 1) {
        // at each issue query the db to get question data to build a question object for front end
        await this.db.any('SELECT id, "issueId", question, bias FROM questions WHERE "issueId" = $1;', [issueArray[index]])
        .then((questionData: any) => {
          // create an object to hold the question data we need to send to the front
          let questionDataObject: any = {}
          
          // iterate through the array of question objects returned by the query to build desired question obj
          questionData.forEach((questionDataReturned:any) => {
            questionDataObject.questionId = questionDataReturned.id;
            questionDataObject.questionText = questionDataReturned.question;
            questionDataObject.bias = questionDataReturned.bias;
          })

          // add the question object to the object which needs to be sent out
          questionsToSendToFrontEnd[issueArray[index]] = questionDataObject;
        })
        .catch((error: any) => {
          console.log('ERROR QUERYING FOR questionData in user.ts', error);
        })
      }

      // after iterating through the issueArray return the question object to be sent to the front end
      return questionsToSendToFrontEnd;
    }

    // update the user positions for their selected issues
    async addPosition(user: string, issues: any, questions: any) {
      // first submit the issue bias for each issues
      const issueArray = Object.keys(issues);
      let issueResponseObject: any = {};
      console.log('2');

      for (let currIssue = 0; currIssue < issueArray.length; currIssue += 1) {
        await this.db.none('INSERT INTO "userIssues" (id, "user", issue, bias) VALUES ($1, $2, $3, $4);',
        [v4(), user, issueArray[currIssue], issues[issueArray[currIssue]]])
        .then(() => {
          // add issues and biases to the issues response object for the front end
          issueResponseObject[issueArray[currIssue]] = issues[issueArray[currIssue]]
        })
        .catch((error: any) => {
          console.log('ERROR AT addPosition IN users.ts', error);
        })
      }
      console.log('3');
      // then submit the question response data
      const questionsArray = Object.keys(questions);
      let questionResponseObject: any = {};

      for (let currQuestion = 0; currQuestion < questionsArray.length; currQuestion += 1) {
        await this.db.none('INSERT INTO "userAnswers" (id, "user", question, bias) VALUES ($1, $2, $3, $4);', 
        [v4(), user, questionsArray[currQuestion], questions[questionsArray[currQuestion]].position])
        .then(() => {
          // abuild the question object
          questionResponseObject[questionsArray[currQuestion]] = {};
          questionResponseObject[questionsArray[currQuestion]].issueId = questions[questionsArray[currQuestion]].issueId;
        })
        .catch((error: any) => {
          console.log('ERROR AT currQuestion IN user.ts', error);
        })
        await this.db.one('SELECT question, bias FROM questions WHERE id = $1', [questionsArray[currQuestion]])
        .then((questionData: any) => {
          console.log(questionData);
          
            questionResponseObject[questionsArray[currQuestion]].questionText = questionData.question;
            questionResponseObject[questionsArray[currQuestion]].position = questionData.bias;
            questionResponseObject[questionsArray[currQuestion]].agree = questions[questionsArray[currQuestion]].position;
  
        })
          .catch((error: any) => {
            console.log('ERROR AT questionData AT addPosition IN users.ts', error);
          })
      }
      const responseObject: any = {
        issues: JSON.parse(JSON.stringify(issueResponseObject)),
        questions: JSON.parse(JSON.stringify(questionResponseObject)),
      }
      console.log('4');
      return responseObject;
    }
 }
