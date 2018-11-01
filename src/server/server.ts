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
import Authenticate from './db/controllers/authenticate'

// activate the express server
const app: Application = express();

// define listening port
const PORT = 3000;

// server static files from dist directory
app.use(express.static(path.resolve(__dirname, '../../dist')));

// Allow CORS
app.use(cors());

// tell express to use bodyparser to parse json files in req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// login end point
app.post('/login', 
  Authenticate.compareHash,
  (_: Request, res: Response) => {
  console.log('LOGIN SUCCESS');
  res.end();
});

// registration end point
app.post('/register', 
  // Authenticate.hashPassword,
  (_: Request, res: Response) => {
    console.log('USER REGRISTRATION SUCCESS');
    res.send('USER REGISTRATION SUCCESS');
  }
);

// wake up the server
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
