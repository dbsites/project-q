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
    return this.db.any('SELECT * FROM companies INNER JOIN company_issues ON companies.id = company_issues.company_id;');
  }

  async updateData(data: any) {
    await data.forEach((item: any) => {
      // update issues scores
      // this.db.none('UPDATE "companyIssues" SET "agreeScore" = $1, "disagreeScore" = $2 WHERE "companyId" = $3 AND "issueId" = $4;', 
      //   [item.agreeScore, item.disagreeScore, item.companyId, item.issueId]);
      // update modal scores
      console.log(item);
      if (item.women_managers === 'n/a') item.women_managers = 0;
      if (item.salary_gap === 'n/a') item.salary_gap = 0;
      this.db.none('INSERT INTO company_module (id, company_id, company_name, company_name_possessive, green_buildings, targets_emissions, human_rights, policy_board_diversity, women_managers, nra_score, brady_rating, tsr, salary_gap, community_score, charity_amount, yes_manchin, no_manchin, yes_repeal, no_repeal, yes_tax_cut, no_tax_cut, diversity_score, aila_score, fair_score, taxes_paid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25);', 
      [v4(), item.company_id, item.company_name, item.company_name_possessive, item.green_buildings, item.targets_emissions, item.human_rights, item.policy_board_diversity, item.women_managers, item.nra_score, item.brady_rating, item.tsr, item.salary_gap, item.community_score, item.charity_amount, item.yes_manchin, item.no_manchin, item.yes_repeal, item.no_repeal, item.yes_tax_cut, item.no_tax_cut, item.diversity_score, item.aila_score, item.fair_score, item.taxes_paid])
      .catch((err: any) => {
        console.log(err);
        return 0;
      });
      // update logo data
      // this.db.none('UPDATE companies SET logo = $1 WHERE id = $2;', 
      //   [item["Image Link"], item["Backend ID"]]);
    })
    
  }

  async getTickers() {
    return await this.db.query('SELECT ticker FROM companies;');
  }

  emptyStockData() {
    return this.db.none('DELETE FROM company_stock;');
  }

  storeRecentStockData(dataObject: any, stockSymbol: any) {
    return this.db.none('INSERT INTO company_stock (id, company_id, timestamp, open, close, high, low, volume) VALUES ($1, (SELECT id FROM companies WHERE ticker = $2), $3, $4, $5, $6, $7, $8);', [v4(), stockSymbol, dataObject.date, dataObject.open, dataObject.close, dataObject.high, dataObject.low, dataObject.volume]);
  }
 

  getStockData(stockSymbol: string) {
    return this.db.any('SELECT timestamp, open, high, low, close, volume FROM company_stock WHERE company_id = (SELECT id FROM companies WHERE ticker = $1);', stockSymbol);
  }
}
