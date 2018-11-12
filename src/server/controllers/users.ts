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
    add (userData: userData, encrypted: string) {
      return this.db.one('INSERT INTO users (id, email, password, first_name, last_name, agree_terms, remember, survey_complete, issues_complete) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;', 
        [v4(), userData.registerEmail, encrypted, userData.firstName, userData.lastName, userData.agreeTerms, false, false, false]);
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
      return this.db.oneOrNone('SELECT id, password, remember FROM users WHERE email = $1', email);
    }

    // update user to remembered or not
    rememberUser (email: string, remember: boolean) {
      return this.db.none('UPDATE users SET remember = $1 WHERE email = $2', [remember, email]);
    }

    // get account data for user
    getAccountData (user: string) {
      return this.db.one('SELECT first_name, last_name, issues_complete, survey_complete FROM users WHERE id = $1;', [user]);
    }

    // add users selected issues
    async addIssues (user: string, issues: any, userIssueIds: string[]) {
      // delete user_issues for user
      await this.db.none('DELETE FROM user_issues WHERE user_id = $1', user);

      // insert new issues
      for (let i = 0; i < userIssueIds.length; i += 1) {
        await this.db.none('INSERT INTO user_issues (id, user_id, issue_id, position) VALUES ($1, $2, $3, $4);', [v4(), user, userIssueIds[i], issues[userIssueIds[i]]]); 
      }
    }

    updateIssuesComplete (user: string, complete: boolean) {
      return this.db.none('UPDATE users SET issues_complete = $2 WHERE id = $1;', [user, complete]);
    }

    // get relevant data from userIssues table
    getIssues(user: string) {
     return this.db.any('SELECT user_issues.issue_id, issues.issue_name, issues.description, user_issues.position FROM user_issues INNER JOIN issues ON user_issues.issue_id = issues.id WHERE user_issues.user_id = $1;', [user]);
    }

    // get questons for users to answer from db
    getQuestions(user: string) {
      return this.db.any('SELECT questions.id, questions.issue_id, questions.question, questions.bias, "userAnswers".agree FROM questions INNER JOIN "userAnswers" ON questions.id = "userAnswers".question WHERE "userAnswers"."user" = $1;', [user]);
    }

    // update the user positions for their selected issues
    async addPosition(user: string, issues: any, questions: any) {
      // first submit the issue bias for each issues
      const issueArray = Object.keys(issues);
      let issueResponseObject: any = {};

      for (let currIssue = 0; currIssue < issueArray.length; currIssue += 1) {

        await this.db.none('UPDATE "userIssues" SET bias = $1 WHERE "user" = $2;',
        [issues[issueArray[currIssue]], user])
        .then(() => {
          // add issues and biases to the issues response object for the front end
          issueResponseObject[issueArray[currIssue]] = issues[issueArray[currIssue]]
        })
        .catch((error: any) => {
          console.log('ERROR AT addPosition IN users.ts', error);
        })
      }
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


 
 