/**
 * ************************************
 *
 * @module  controllers/addQuestionDataToDb.ts
 * @author Team Quail
 * @date 
 * @description middleware to create question entries in the db
 *
 * ************************************
 */

import { Request, Response, NextFunction } from 'express';
// import db and db functionality from modular files to access db methods
import db from '../index';

const DatabaseMethods: any = {};

// adds questions data to the questions table
DatabaseMethods.insertQuestions = (req: Request, _: Response, next: NextFunction) => {
  // db.users accesses methods defined in company controller
  db.data.addQuestions(req.body)
  .then(() => {
    next();
  })
  .catch((error: any) => {
    console.log('ERROR AT INSERT DATA IN addQuestionToDb', error);
  });
}

// inserts issue data
DatabaseMethods.insertIssues = (req: Request, _: Response, next: NextFunction) => {
  db.data.addIssues(req.body)
  .then(() => {
    next();
  })
  .catch((error: any) => {
    console.log('ERROR AT insertIssues IN addQuestionToDb', error);
  });
}

// gets all issue data
DatabaseMethods.getIssues = (_: Request, res: Response, next: NextFunction) => {
  // declare object to return to the front end
  res.locals.issues = {};

  // query db for issue data
  db.data.getIssues()
  .then((issueData: any[]) => {
    // for each issue object, build out the response object
    issueData.forEach((issueObject: any) => {
      res.locals.issues[issueObject.id] = {}
      res.locals.issues[issueObject.id].issueId = issueObject.id;
      res.locals.issues[issueObject.id].issueName = issueObject.issue_name;
      res.locals.issues[issueObject.id].issueBlurb = issueObject.description;
    })
    // move on to end response and deliver issues object
    // res.locals.issues = {issueId: { issueId: string, issueName: string, issueBlurb: string}}
    next();
  })
  .catch((error: any) => {
    console.log('ERROR AT insertIssues IN addQuestionToDb', error);
  });
}

// get issue abbreviated names
DatabaseMethods.getIssueAbbrvs = (_: Request, res: Response, next: NextFunction) => {
  // declare object to return to the front end
  res.locals.issueAbbrvs = {};
  // query db for issue data
  db.data.getIssueAbbrvs()
  .then((issueData: any[]) => {
    // for each issue object, build out the response object
    issueData.forEach((issueObject: any) => {
      res.locals.issueAbbrvs[issueObject.issue_name] = issueObject.abbrv;
    })
    // move on to end response and deliver issues object
    // res.locals.issues = {issueId: { issueId: string, issueName: string, issueBlurb: string}}
    next();
  })
  .catch((error: any) => {
    console.log('ERROR AT insertIssues IN addQuestionToDb', error);
  });
}

DatabaseMethods.insertPoliticianData = (_: Request, res: Response, next: NextFunction) => {
  db.data.insertPoliticianData(req.body)
  .then(() => {
    next();
  })
}



export default DatabaseMethods;