/**
 * ************************************
 *
 * @module  controllers/company.ts
 * @author Team Quail
 * @date 
 * @description methods to modify/create/access company data within the database
 *
 * ************************************
 */

// import pg-promise types and sql statements 
import { IDatabase } from 'pg-promise';
// import issues interface
import { Issues } from './index';
// import unique user id creation library
import { v4 } from 'uuid';

export class CompanyRepository {
  
   constructor (db: any) {
     // database
     this.db = db;
   }

   private db: IDatabase<any>;

   // add new company data to the database
   
   // TODO SOLVE ANY/OBJECT TYPING***********************************************
   // add is asyncronous because I cannot return the db.none method the way that I did with the user controllers
   // this async wrapper here makes sure all the data gets put into the database before we move on with the middleware
   async add (companyData: any[]) {
    for (let i = 0; i < companyData.length; i += 1) {

      // define the issue object which get added to the company object
      // issues interface comes from line 14
      let issues: Issues = {
        economyScore: companyData[i].economyScore,
        environmentScore: companyData[i].environmentScore,
        civilRightsScore: companyData[i].civilRightsScore,
        salaryGapScore: companyData[i].salaryGapScore,
        philanthropyScore: companyData[i].philanthropyScore,
        immigrationScore: companyData[i].immigrationScore,
      }

      // after each issues object is created, submit the issues object and the rest of the company data 
      this.db.none('INSERT INTO company (id, ticker, name, blurb, logo, issues) VALUES ($1, $2, $3, $4, $5, $6);', 
      [v4(), companyData[i].ticker, companyData[i].companyName, companyData[i].blurb, companyData[i].link, JSON.stringify(issues)])
      .then(() => {
        console.log('DATA ENTERED');
      })
      .catch((error: any) => {
        console.log('ERROR AT ADD FUNCTION IN COMPANY.TS', error);
      })
    }
  };
}
