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
      if (companyData[item.name]) {
        companyData[item.name][item.issue] = {};
        companyData[item.name][item.issue].agreeScore = item.agreeScore;
        companyData[item.name][item.issue].disagreeScore = item.disagreeScore;
      }
      else {
        companyData[item.name] = {};
        companyData[item.name].name = item.name;
        companyData[item.name].ticker = item.ticker;
        companyData[item.name].description = item.description;
        companyData[item.name].logo = item.logo;
        companyData[item.name][item.issue] = {};
        companyData[item.name][item.issue].agreeScore = item.agreeScore;
        companyData[item.name][item.issue].disagreeScore = item.disagreeScore;
      }
    })
    res.locals.companyDataArray = companyData;
    next();
  })
  .catch((error: any) => {
    console.log('ERROR AT getCompanyList IN companyDataMethods.ts', error);
    res.sendStatus(500);
  });
}

CompanyDatabase.updateData = (req: Request, _: Response, next: NextFunction) => {
  // db.users accesses methods defined in company controller
  db.companies.updateData(req.body)
  .then(() => {
    next();
  })
  .catch((error: any) => {
    console.log('ERROR AT INSERT DATA IN addCompanyToDb', error);
  }); 
}

CompanyDatabase.getTickers = () => {
  return db.companies.getTickers();
}

export default CompanyDatabase;
