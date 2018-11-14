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
// import { Issues } from './index';
// import unique user id creation library
import { v4 } from 'uuid';

export class CompanyRepository {

  constructor(db: any) {
    // database
    this.db = db;
  }

  private db: IDatabase<any>;

  // add new company data to the database

  // TODO SOLVE ANY/OBJECT TYPING***********************************************
  // add is asyncronous because I cannot return the db.none method the way that I did with the user controllers
  // this async wrapper here makes sure all the data gets put into the database before we move on with the middleware
  async add(companyData: any[]) {
    for (let i = 0; i < companyData.length; i += 1) {
      // after each issues object is created, submit the issues object and the rest of the company data 
      this.db.none('INSERT INTO companies (id, ticker, name, logo, description) VALUES ($1, $2, $3, $4, $5);',
        [v4(), companyData[i].ticker, companyData[i].companyName, companyData[i].blurb, companyData[i].link])
        // .then(() => {
        //   this.db.none('INSERT INTO companyissues (id, compan) ')
        // })
        .catch((error: any) => {
          console.log('ERROR AT ADD FUNCTION IN COMPANY.TS', error);
        })
    }
  };

  async insertIssues(issueData: any[]) {
    for (let i = 0; i < issueData.length; i += 1) {

      this.db.none('INSERT INTO "companyIssues" (id, "companyId", company, "issueId", issue, "agreeScore", "disagreeScore") VALUES ($1, $2, $3, $4, $5, $6, $7);',
        [v4(), issueData[i].id, issueData[i].name, issueData[i].issueId, issueData[i].issue, issueData[i].agreeScore, issueData[i].disagreeScore])
        .catch((error: any) => {
          console.log('ERROR AT insertIssuse IN companyDataMethods.ts', error);
        });
    }
  }

  // query to get all companies out of the db
  getList() {
    return this.db.any('SELECT * FROM companies INNER JOIN "companyIssues" ON companies.id = "companyIssues"."companyId";');
  }

  async updateData(data: any) {
    await data.forEach((item: any) => {
      // this.db.none('UPDATE "companyIssues" SET "agreeScore" = $1, "disagreeScore" = $2 WHERE "companyId" = $3 AND "issueId" = $4;', 
      //   [item.agreeScore, item.disagreeScore, item.companyId, item.issueId]);
      this.db.none('UPDATE "companies" SET "description" = $1, "logo" = $2 WHERE "name" = $3;', 
        [item.description, item.logo, item.name]);
    })
  }

  async getTickers() {
    return await this.db.query('SELECT ticker FROM companies;');
  }

  storeRecentStockData(dataObject: any, stockSymbol: any) {
    return this.db.none('INSERT INTO company_stock (id, company_id, timestamp, open, close, high, low, volume) VALUES ($1, (SELECT id FROM companies WHERE ticker = $2), $3, $4, $5, $6, $7, $8);', [v4(), stockSymbol, dataObject.date, dataObject.open, dataObject.close, dataObject.high, dataObject.low, dataObject.volume]);
  }
}
