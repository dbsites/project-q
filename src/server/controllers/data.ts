/**
 * ************************************
 *
 * @module  controllers/question.ts
 * @author Team Quail
 * @date 
 * @description methods to modify/create/access questions data within the database
 *
 * ************************************
 */

// import pg-promise types and sql statements 
import { IDatabase } from 'pg-promise';
// import issues interface
// import { Issues } from './index';
// import unique user id creation library
import { v4 } from 'uuid';

export class DatabaseRepository {
  constructor (db: any) {
    this.db = db;
  }

  private db: IDatabase<any>; 
  
  // add questions
  async addQuestions(questionData: any[]) {
    for(let i=0; i < questionData.length; i++) {

      this.db.none('INSERT INTO questions (id, "issueId", question, bias) VALUES ($1, $2, $3, $4);', 
      [v4(), questionData[i].issueId, questionData[i].question, questionData[i].Bias])
      .then(() => {
        console.log('DATA ENTERED');
      })
      .catch((error: any) => {
        console.log('ERROR AT ADD FUNCTION IN QUESTIONSTORE.TS', error);
      })
    }
  };

  // deliver questions
  getQuestions(){
    return this.db.any('SELECT * FROM questions;')
  }

  // deliver questions related to an issues
  async getIssueQuestions(issues: any[]) {
    let questions: any = {};
    for (let i = 0; i < issues.length; i += 1) {
      await this.db.any('SELECT * FROM questions WHERE "issueId" = $1', [issues[i]])
      .then((data: any) => {
        data.forEach((question: any)=> {
          questions[question.id] = {};
          questions[question.id].issueId = question.issueId;
          questions[question.id].questionText = question.question;
          questions[question.id].position = question.bias;
          questions[question.id].agree = null;
        })
      })
      .catch((error: any) => {
        console.log('ERROR AT getIssueQuestions IN data.ts', error);
      })
    }
    return questions;
  }

  // insert issue data 
  async addIssues(issueData: any[]) {
      for (let i = 0; i < issueData.length; i += 1) {
        this.db.none('INSERT INTO issues (id, issue, description) VALUES ($1, $2, $3)', [v4(), issueData[i].issue, issueData[i].description])
        .then(() => {
          console.log('ISSUES ADDED');
        })
        .catch((error: any) => {
          console.log('ERROR AT addIssues IN additionalDataMethods.ts', error);
        })
      }
  }

}
