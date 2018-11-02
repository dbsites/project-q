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
import db from '../../db';

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

export default CompanyDatabase;
