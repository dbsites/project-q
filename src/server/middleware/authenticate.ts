/**
 * ************************************
 *
 * @module  controllers/authenticate.ts
 * @author Team Quail
 * @date 
 * @description middleware to authenticate user logins and create cookies
 *
 * ************************************
 */

import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
// import db and db functionality from modular files to access db methods
import db from '../index';
// import userData interface for ts
import { userData } from '../controllers/index';

// create object which holds the authentication methods
const Authenticate: any =  {};

// registration route, new account are directed here and password is hashed then user is added to the db
Authenticate.hashPassword = (req: Request, _: Response, next: NextFunction) => {
  return bcrypt.hash(req.body.password, 10, (error: Error, encrypted: string) => {
    if (error) {
      console.log('ERROR IN authenticate.ts for Encryption', error);
    }
    else {
      // replace the plain text password with the new encrypted one
      req.body.password = encrypted;
      // db.users accesses methods defined in users repo
      db.users.add(req.body)
      .then(() => {
        console.log('USER REGISTRATION SUCCESS', req.body);
        next();
      })
      .catch((error: any) => {
        console.log('ERROR AT REGISTRATION IN SERVER.ts', error);
      });
    }
  })
}

// login route, user plaint text pw is compared against the hash, if correct the middleware moves along,
//  if the password is incorrect middleware chain breaks and the front recieves and incorrect password response
Authenticate.compareHash = (req: Request, res: Response, next: NextFunction) => {
  // db.users accesses methods defined in the users repo
  db.users.findByEmail(req.body.email)
  .then((data: userData) => {
    bcrypt.compare(req.body.password, JSON.parse(JSON.stringify(data.password)), (error: Error, match: boolean) => {
      if (match) {
        next();
      }
      else if (!match) {
        res.send('Incorrect Password');
      }
      else {
        console.log('ERROR AT COMPARE IN AUTHENTICATE.TS', error);
      }
    })
  })
  .catch((error: any) => {
    console.log('ERROR AT USER FIND BY EMAIL IN AUTHENTICATE.TS', error);
  });
}

export default Authenticate;
