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

  async updateData(data: any[]) {
  
      // for (let i = 0 ; i < data.length; i += 1) {
      // update issues scores
        // this.db.none('UPDATE company_module SET trump_alignment = $1 WHERE company_id = $2', [data[i].trump, data[i].id]);
      // this.db.none('UPDATE "companyIssues" SET "agreeScore" = $1, "disagreeScore" = $2 WHERE "companyId" = $3 AND "issueId" = $4;', 
      //   [item.agreeScore, item.disagreeScore, item.companyId, item.issueId]);
      // update modal scores
      // if (data[i].women_managers === 'n/a') data[i].women_managers = 0;
      // if (data[i].salary_gap === 'n/a') data[i].salary_gap = 0;

      // await this.db.none('INSERT INTO company_module (id, company_name, green_buildings, targets_emissions, human_rights, policy_board_diversity, women_managers, nra_score, brady_rating, tsr, salary_gap, community_score, charity_amount, yes_manchin, no_manchin, yes_repeal, no_repeal, yes_tax_cut, no_tax_cut, diversity_score, aila_score, fair_score, taxes_paid, company_id, trump_alignment, norml_score, company_name_possessive) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27);', 
      // [v4(), data[i].company_name, data[i].green_buildings, data[i].targets_emissions, data[i].human_rights, data[i].policy_board_diversity, data[i].women_managers, data[i].nra_score, data[i].brady_rating, data[i].tsr, data[i].salary_gap, data[i].community_score, data[i].charity_amount, data[i].yes_manchin, data[i].no_manchin, data[i].yes_repeal, data[i].no_repeal, data[i].yes_tax_cut, data[i].no_tax_cut, data[i].diversity_score, data[i].aila_score, data[i].fair_score, data[i].taxes_paid, data[i].company_id, data[i].trump_alignment, data[i].norml_score, data[i].company_name_possessive]);
      // .catch((err: any) => {
      //   console.log(err);
      //   return 0;
      // });
      // update logo data
      // this.db.none('UPDATE companies SET logo = $1 WHERE id = $2;', 
      //   [item["Image Link"], item["Backend ID"]]);
    }
    
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

  getInfo() {
    return this.db.any('SELECT id, full_name FROM companies;');
  }

  async getModuleData(companyData: any[]) {
    let moduleData: any = {};
    for (let i = 0; i < companyData.length; i += 1) {
      await this.db.any('SELECT * FROM company_module WHERE company_id = $1;', companyData[i].id)
      .then((moduleScores: any) => {
        moduleData[companyData[i].full_name] = moduleScores;
      })

    }
    return moduleData;
  }

  getCompanyModuleData(stockSymbol: string) {
    return this.db.one('SELECT * FROM company_module WHERE company_id = (SELECT id FROM companies WHERE ticker = $1);', stockSymbol);
  }
  
}
