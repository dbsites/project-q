/**
 * ************************************
 *
 * @module  controllers/addCompanyToDb.ts
 * @author Team Quail
 * @date 
 * @description middleware to create company entries in the db
 *
 * ************************************
 */

import { Request, Response, NextFunction } from 'express';
// import db and db functionality from modular files to access db methods
import db from '../index';

// create object which holds the authentication methods
const CompanyDatabase: any =  {};

// add the companies to the database
CompanyDatabase.insertData = (req: Request, _: Response, next: NextFunction) => {
  // db.users accesses methods defined in company controller
  db.companies.add(req.body)
  .then(() => {
    next();
  })
  .catch((error: any) => {
    console.log('ERROR AT INSERT DATA IN addCompanyToDb', error);
  }); 
}

// insert issues score data
CompanyDatabase.insertIssueScores = (req: Request, _: Response, next: NextFunction) => {
  db.companies.insertIssues(req.body)
  .then(() => {
    console.log('ISSUE SCORES INSERTED');
    next();
  })
  .catch((error: any) => {
    console.log('ERROR AT insertIssues IN companyDataMethods.ts', error);
  })
}

// deliver company list to the front end
CompanyDatabase.getCompanyList = (_: Request, res: Response, next: NextFunction) => {
  db.companies.getList()
  .then((list: any[]) => {
    let companyData: any = {}
    // loop through the list of objects and create an more digestable data object for the front end
    list.forEach((item:any) => {
      if (companyData[item.full_name]) {
        companyData[item.full_name][item.issue] = {};
        companyData[item.full_name][item.issue].agreeScore = item.agreeScore;
        companyData[item.full_name][item.issue].disagreeScore = item.disagreeScore;
      }
      else {
        companyData[item.full_name] = {};
        companyData[item.full_name].full_name = item.full_name;
        companyData[item.full_name].short_name = item.short_name;
        companyData[item.full_name].ticker = item.ticker.split('.')[0];
        companyData[item.full_name].description = item.description;
        companyData[item.full_name].yearFounded = item.year_founded;
        companyData[item.full_name].numberEmployees = item.number_employees;
        companyData[item.full_name].url = item.url;
        companyData[item.full_name].logo = item.logo;
        companyData[item.full_name][item.issue] = {};
        companyData[item.full_name][item.issue].agreeScore = item.agreeScore;
        companyData[item.full_name][item.issue].disagreeScore = item.disagreeScore;
      }
    })
    res.locals.companyData = {};
    res.locals.companyData.companyDataArray = companyData;
    res.locals.companyData.issueAbbrvs = res.locals.issueAbbrvs
    next();
  })
  .catch((error: any) => {
    console.log('ERROR AT getCompanyList IN companyDataMethods.ts', error);
    res.sendStatus(500);
  });
}

// CompanyDatabase.updateData = (req: Request, _: Response, next: NextFunction) => {
//   // db.users accesses methods defined in company controller
//   db.companies.updateData(req.body)
//   .then(() => {
//     next();
//   })
//   .catch((error: any) => {
//     console.log('ERROR AT INSERT DATA IN addCompanyToDb', error);
//   }); 
// }

CompanyDatabase.getTickers = () => {
  return db.companies.getTickers();
}

export default CompanyDatabase;
