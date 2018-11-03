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
// import cors to enable cross-origin sharing between dev server and server
import * as cors from 'cors';
// import authentication middleware
import Authenticate from './middleware/authenticate'
// import companyDb middleware
import CompanyDatabase from './middleware/companyDataMethods';

// activate the express server
const app: Application = express();

// define listening port
const PORT = 3000;

// server static files from dist directory
app.use(express.static(path.resolve(__dirname, '../../dist')));

// Allow CORS
app.use(cors());

// tell express to use bodyparser to parse json files in req.body
// limit 10mb increases the amount of data which can be parsed by the server at once, this could have side effects 
// RESEARCH THIS*********************************************************************
// but was needed to submit all the company data, maybe remove if it substantially changes the way that bodyParser functions
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: true }));



// login end point
app.post('/login', 
  Authenticate.compareHash,
  (_: Request, res: Response) => {
    res.sendStatus(200);
  }
);

// registration end point
app.post('/register', 
  Authenticate.hashPassword,
  (_: Request, res: Response) => {
    res.sendStatus(200);
  }
);

// TODO UPDATE END POINT TO GET USER ISSUES

// end point for deliverying a list of companies on dashboard render
app.get('/companyList', 
  CompanyDatabase.getCompanyList,
  (_: Request, res: Response) => {
    res.send(res.locals.companyDataArray);
  }
);

// end point for company data submission
// CompanyDatabase middleware handles the insertion of the data and calls the query statements
app.post('/companyData', 
  CompanyDatabase.insertData,
  (__dirname: Request, res: Response) => {
    res.sendStatus(200);
  }
);

// wake up the server
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
