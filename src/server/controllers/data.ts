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
    for(let i=0; i < questionData.length-1; i++) {

      this.db.none('INSERT INTO questions (id, issue, question) VALUES ($1, $2, $3);', 
      [v4(), questionData[i].issue, questionData[i].question])
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
