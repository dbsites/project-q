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
// import cookie parser in order to set user cookies
import * as cookieParser from 'cookie-parser';
// import cors to enable cross-origin sharing between dev server and server
import * as cors from 'cors';
// import helmet to increase app security
import * as helmet from 'helmet';
// import authentication middleware
import Authenticate from './middleware/authenticate'
// import companyDb middleware
// import questionDb middleware
import QuestionDatabase from './middleware/addQuestionDataToDb';
import CompanyDatabase from './middleware/companyDataMethods';
// import companyDb middleware
import Cookie from './middleware/cookies';

// activate the express server
const app: Application = express();

// define listening port
const PORT = 3000;

// server static files from dist directory
app.use(express.static(path.resolve(__dirname, '../../dist')));

// Allow CORS, credentials true expects  request to come with credentials and origin specifies where they should come from
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));

//  protects from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet())

// tell express to use bodyparser to parse json files in req.body
// limit 10mb increases the amount of data which can be parsed by the server at once, this could have side effects 
// RESEARCH THIS*********************************************************************
// but was needed to submit all the company data, maybe remove if it substantially changes the way that bodyParser functions
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

// cookie initializer
app.use(cookieParser());
  
// login end point
app.post('/login', 
  Cookie.check,
  Authenticate.compareHash,
  Cookie.give,
  (_: Request, res: Response) => {
    res.sendStatus(200);
    res.end();
  }
);

// login with cookies end point
app.post('/login/cookie', (_: Request, res: Response) => {
  console.log('USER HAS A VALID COOKIE');
  res.send(200);
});

// registration end point
app.post('/register', 
  Authenticate.hashPassword,
  (_: Request, res: Response) => {
    res.sendStatus(200);
    res.end();
  }
);

// TODO UPDATE END POINT TO GET USER ISSUES

// end point for deliverying a list of companies on dashboard render
app.get('/companyList', 
  CompanyDatabase.getCompanyList,
  (_: Request, res: Response) => {
    res.send(res.locals.companyDataArray);
    res.end();
  }
);

// end point for company data submission
// CompanyDatabase middleware handles the insertion of the data and calls the query statements
app.post('/companyData', 
  CompanyDatabase.insertData,
  (_: Request, res: Response) => {
    res.sendStatus(200);
    res.end();
  }
);

app.post('/questionData', 
QuestionDatabase.insertData,
(_: Request, res: Response) => {
  res.sendStatus(200);
})

// wake up the server
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
