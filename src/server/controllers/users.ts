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

    // indicate that the user has selected issues
    updateIssuesComplete (user: string, complete: boolean) {
      return this.db.none('UPDATE users SET issues_complete = $2 WHERE id = $1;', [user, complete]);
    }

    // indicate that the user has answered questions
    updateSurveyComplete (user: string, complete: boolean) {
      return this.db.none('UPDATE users SET survey_complete = $2 WHERE id = $1;', [user, complete]);
    }

    // get relevant data from userIssues table
    getIssues(user: string) {
     return this.db.any('SELECT user_issues.issue_id, issues.issue_name, issues.description, user_issues.position FROM user_issues INNER JOIN issues ON user_issues.issue_id = issues.id WHERE user_issues.user_id = $1;', [user]);
    }

    // get questons for users to answer from db
    async getQuestions(user: string, issueIds: any[], surveyComplete: boolean) {
      if (!surveyComplete) {
        
        return this.db.any('SELECT questions.id, questions.issue_id, questions.question_text, questions.position FROM questions INNER JOIN user_issues ON questions.issue_id = user_issues.issue_id WHERE user_issues.user_id = $1;', [user]);

      } else if (issueIds.length === 0) {

          return [];

      } else if(issueIds.length === 1) {

          return this.db.any('SELECT questions.id, questions.issue_id, questions.question_text, questions.position, user_answers.agree FROM questions INNER JOIN user_answers ON questions.id = user_answers.question_id WHERE questions.issue_id = $1 AND user_answers.user_id = $2;', [issueIds[0], user]);

      } else if(issueIds.length === 2) {

          return this.db.any('SELECT questions.id, questions.issue_id, questions.question_text, questions.position, user_answers.agree FROM questions INNER JOIN user_answers ON questions.id = user_answers.question_id WHERE (questions.issue_id = $1 OR questions.issue_id = $2) AND user_answers.user_id = $3;', [issueIds[0], issueIds[1], user]);

      } else if(issueIds.length === 3) {

          return this.db.any('SELECT questions.id, questions.issue_id, questions.question_text, questions.position, user_answers.agree FROM questions INNER JOIN user_answers ON questions.id = user_answers.question_id WHERE (questions.issue_id = $1 OR questions.issue_id = $2 OR questions.issue_id = $3) AND user_answers.user_id = $4;', [issueIds[0], issueIds[1], issueIds[2], user]);

      } else if(issueIds.length === 4) {

          return this.db.any('SELECT questions.id, questions.issue_id, questions.question_text, questions.position, user_answers.agree FROM questions INNER JOIN user_answers ON questions.id = user_answers.question_id WHERE (questions.issue_id = $1 OR questions.issue_id = $2 OR questions.issue_id = $3 OR questions.issue_id = $4) AND user_answers.user_id = $5;', [issueIds[0], issueIds[1], issueIds[2], issueIds[3], user]);

      } else if(issueIds.length === 5) {

          return this.db.any('SELECT questions.id, questions.issue_id, questions.question_text, questions.position, user_answers.agree FROM questions INNER JOIN user_answers ON questions.id = user_answers.question_id WHERE (questions.issue_id = $1 OR questions.issue_id = $2 OR questions.issue_id = $3 OR questions.issue_id = $4 OR questions.issue_id = $5) AND user_answers.user_id = $6;', [issueIds[0], issueIds[1], issueIds[2], issueIds[3], issueIds[4], user]);

      } else if(issueIds.length === 6) {

          return this.db.any('SELECT questions.id, questions.issue_id, questions.question_text, questions.position, user_answers.agree FROM questions INNER JOIN user_answers ON questions.id = user_answers.question_id WHERE (questions.issue_id = $1 OR questions.issue_id = $2 OR questions.issue_id = $3 OR questions.issue_id = $4 OR questions.issue_id = $5 OR questions.issue_id = $6) AND user_answers.user_id = $7;', [issueIds[0], issueIds[1], issueIds[2], issueIds[3], issueIds[4], issueIds[5], user]);
      } else {
          return [];
      }
    }

    // update a users position on an issue
    updateIssuePosition(user: string, issueId: string, position: string) {
      return this.db.none('UPDATE user_issues SET position = $1 WHERE user_id = $2 AND issue_id = $3;', [position, user, issueId]);
    }

    // update a users survey answers
    updateUserSurvey(user: string, questionId: string, agree: boolean) {
      return this.db.none('INSERT INTO user_answers (id, user_id, question_id, agree) VALUES ($1, $2, $3, $4);', [v4(), user, questionId, agree]);
    }
 }


 
 