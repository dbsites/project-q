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
import { userDataFromDb } from '../controllers/index';

// create object which holds the authentication methods
const Authenticate: any =  {};

// registration route, new accounts are directed here and password is hashed then user is added to the db
Authenticate.hashPassword = (req: Request, res: Response, next: NextFunction) => {
  return bcrypt.hash(req.body.confirmPassword, 10, (error, encrypted) => {
    if (error) {
      console.log('ERROR IN authenticate.ts for Encryption', error);
      res.sendStatus(500);
    }
    else {
      // replace the plain text password with the new encrypted one
      req.body.confirmPassword = encrypted;
      // db.users accesses methods defined in users repo
      db.users.add(req.body)
      .then(() => {
        next();
      })
      .catch((error: any) => {
        console.log('ERROR AT REGISTRATION IN AUTHENTICATE.ts', error);
        res.sendStatus(500);
      });
    }
  })
}

// login route, user plaint text pw is compared against the hash, if correct the middleware moves along,
//  if the password is incorrect middleware chain breaks and the front recieves and incorrect password response
Authenticate.compareHash = (req: Request, res: Response, next: NextFunction) => {
  // db.users accesses methods defined in the users repo
  db.users.findByEmail(req.body.loginEmail)
  .then((data: userDataFromDb) => {
    bcrypt.compare(req.body.loginPassword, data.password, (error: Error, match: boolean) => {
      if (match) {
        next();
      }
      else if (!match) {
        res.send('Incorrect Password');
      }
      else {
        console.log('ERROR AT COMPARE IN AUTHENTICATE.TS', error);
        res.sendStatus(500);
      }
    })
  })
  .catch((error: any) => {
    console.log('ERROR AT USER FIND BY EMAIL IN AUTHENTICATE.TS', error);
    res.sendStatus(500);
  });
}

export default Authenticate;
