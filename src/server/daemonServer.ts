/**
 * ************************************
 *
 * @module  daemonServer.ts
 * @author Team Quail
 * @date 
 * @description Node Express Server to continously hit finance API on an interval
 *
 * ************************************
 */

  // import express server api
import * as express from 'express';
// import express types for .ts functionality
import { Application } from 'express';
// import body-parser for getting req.body from front end posts
import * as bodyParser from 'body-parser';
// import cors to enable cross-origin sharing between dev server and server
import * as cors from 'cors';
// import helmet to increase app security
import * as helmet from 'helmet';
// import companyDb middleware
// import CompanyDatabase from './middleware/companyDataMethods';
// import database middleware
// import DatabaseMethods from './middleware/additionalDataMethods';


// activate the express server
const app: Application = express();

// define listening port
const PORT = 6000;

// define interval constant
// const interval = 60 * 1000;

// Allow CORS, credentials true expects  request to come with credentials and origin specifies where they should come from
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));

//  protects from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());

// tell express to use bodyparser to parse json files in req.body
app.use(bodyParser.json({limit: '10mb'}));


// write and interval that hits an api to gather stock data
// 100 calls per second, 1000 calls per day
// one call per stock ticker
// -> query for tickers 

// async function getStockPrices() {
//   const stockSymbols: any = [];
//   await CompanyDatabase.getTickers();
// }

// function showSymbols() {
//   return 
// }

// stockSymbols.forEach((item: any) => {
//   console.log(item);
// });


// iterate through the tickers 
// hit the api with the ticker data
// get the response back
// iterate through the response
// store each in the database, update at open and at close




// wake up the server
app.listen(PORT, () => console.log(`Daemon listening on PORT: ${PORT}`));