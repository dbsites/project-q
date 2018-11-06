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

// delivers the questions data to the front end
DatabaseMethods.getQuestionList = (_: Request, res: Response, next: NextFunction) => {
  db.data.getQuestions()
    .then((data: any[]) => {
      res.locals.questionDataArray = data;
      next();
    })
    .catch((error: any) => {
      console.log('ERROR AT getQuestionList IN addQuestionsDataToDb.ts', error);
      res.sendStatus(500);
    })
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

export default DatabaseMethods;