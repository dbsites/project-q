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
  // if request has failed in earlier middleware
  if (res.locals.status === 500) next();

  db.companies.getList()
  .then((list: any[]) => {
    let companyData: any = {}
    // loop through the list of objects and create an more digestable data object for the front end
    list.forEach((item:any) => {
      if (companyData[item.full_name]) {
        companyData[item.full_name][item.issue] = {};
        companyData[item.full_name][item.issue].agreeScore = item.agree_score;
        companyData[item.full_name][item.issue].disagreeScore = item.disagree_score;
      }
      else {
        companyData[item.full_name] = {};
        companyData[item.full_name].full_name = item.full_name;
        companyData[item.full_name].short_name = item.short_name;
        companyData[item.full_name].ticker = item.ticker;
        companyData[item.full_name].description = item.description;
        companyData[item.full_name].yearFounded = item.year_founded;
        companyData[item.full_name].numberEmployees = item.number_employees;
        companyData[item.full_name].url = item.url;
        companyData[item.full_name].logo = item.logo;
        companyData[item.full_name][item.issue] = {};
        companyData[item.full_name][item.issue].agreeScore = item.agree_score;
        companyData[item.full_name][item.issue].disagreeScore = item.disagree_score;
      }
    })
    res.locals.companyData = {};
    res.locals.companyData.companyDataArray = companyData;
    res.locals.companyData.issueAbbrvs = res.locals.issueAbbrvs;
    // res.locals.companyData.moduleData = res.locals.moduleData; 
    // res.locals.companyData.politicianData = res.locals.politicianData;
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

CompanyDatabase.getInfo = () => {
  return db.companies.getInfo();
}

CompanyDatabase.storeRecentStockData = (dataObject: any, stockSymbol: any) => {
  return db.companies.storeRecentStockData(dataObject, stockSymbol);
}

CompanyDatabase.getStockData = (req: Request, res: Response, next: NextFunction) => {
  res.locals.stockData = {};
  db.companies.getStockData(req.body.ticker)
  .then((stockDataObject: any) => {
    res.locals.stockData.timestamp = stockDataObject[0].timestamp;
    res.locals.stockData.open = stockDataObject[0].open;
    res.locals.stockData.high = stockDataObject[0].high;
    res.locals.stockData.low = stockDataObject[0].low;
    res.locals.stockData.close = stockDataObject[0].close;
    res.locals.stockData.volume = stockDataObject[0].volume;
    next();
  })
  .catch((error: any) => {
      console.log('ERROR AT getStockData IN companyDataMethods.ts', error);
      res.status(500).send("SERVER FAILURE");
  })
}

CompanyDatabase.emptyStockData = () => {
  return db.companies.emptyStockData();
}

CompanyDatabase.getCompanyModule = async (_: Request, res: Response, next: NextFunction) => {

  const companyData = await CompanyDatabase.getInfo();
  res.locals.companyData = companyData;

  db.companies.getModuleData(companyData)
  .then((companyData:any) => {
    res.locals.moduleData = companyData;
    next();
  })
  .catch((error: any) => {
    if (error.received === 0) {
      res.status(500).send('INVALID TICKER');
    }
    else {
      console.log('ERROR AT getCompanyModule IN companyDataMethods.ts', error);
      res.status(500).send('SERVER FAILURE');
    }
  })
}

export default CompanyDatabase;
