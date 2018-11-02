/**
 * ************************************
 *
 * @module  Server.ts
 * @author Team Quail
 * @date 
 * @description Node Express Server to route fetch requests from the front end to appropriate end points 
 *
 * ************************************
 */

 // import express server api
import * as express from 'express';
// import express types for .ts functionality
import { Application, Request, Response } from 'express';
// import path for universal file locations
import * as path from 'path';
// import body-parser for getting req.body from front end posts
import * as bodyParser from 'body-parser';
// import authentication middleware
import Authenticate from './db/controllers/authenticate'
// import companyDb middleware
import CompanyDatabase from './db/controllers/addCompanyDataToDb';
import db from './db';

// activate the express server
const app: Application = express();

// define listening port
const PORT = 3000;

// server static files from dist directory
app.use(express.static(path.resolve(__dirname, '../../dist')));
// tell express to use bodyparser to parse json files in req.body
// limit 10mb increases the amount of data which can be parsed by the server at once, this could have side effects 
// RESEARCH THIS*********************************************************************
// but was needed to submit all the company data, maybe remove if it substantially changes the way that bodyParser functions
app.use(bodyParser.json({limit: '10mb'}));

// login end point
app.post('/login', 
  Authenticate.compareHash,
  (_: Request, res: Response) => {
  console.log('LOGIN SUCCESS');
  res.end();
});

// registration end point
app.post('/register', 
  Authenticate.hashPassword,
  (_: Request, res: Response) => {
    console.log('USER REGRISTRATION SUCCESS');
    res.send('USER REGISTRATION SUCCESS');
  }
);

// end point for company data submission
// CompanyDatabase middleware handles the insertion of the data and calls the query statements
app.post('/companyData', 
  CompanyDatabase.insertData,
  (__dirname: Request, res: Response) => {
    res.sendStatus(200);
})

// wake up the server
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
