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
// import db and db functionality from modular files to access db methods
import db from './db';
// import userData interface for ts
import {userData} from './db/repos/index';
// import body-parser for getting req.body from front end posts
import * as bodyParser from 'body-parser';

// activate the express server
const app: Application = express();

// define listening port
const PORT = 3000;

// server static files from dist directory
app.use(express.static(path.resolve(__dirname, '../../dist')));
// tell express to use bodyparser to parse json files in req.body
app.use(bodyParser.json());

// login end point
// TODO ADD AUTHENTICATION****************************************************
app.post('/login', (req: Request, res: Response) => {
  // db.users accesses methods defined in the users repo
  db.users.findByEmail(req.body.email)
    .then((data: userData) => {
      if (data.password === req.body.password) {
        console.log('User Login Success');
        res.send(data);
        res.end();
      }
      else {
        console.log('Login Failure');
        res.send('Login Failure, double check your password');
        res.end();
      }
    })
    .catch((error: any) => {
      console.log('ERROR AT USER LOGIN IN SERVER.ts', error);
    })
});

// registration end point
// TODO COOKIE AND SESSIONS**************************************************
app.post('/register', (req: Request, res: Response) => {
  // db.users accesses methods defined in users repo
  db.users.add(req.body)
    .then(() => {
      console.log('USER REGISTRATION SUCCESS');
      res.end();
    })
    .catch((error: any) => {
      console.log('ERROR AT REGISTRATION IN SERVER.ts', error);
    });
});

// wake up the server
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
