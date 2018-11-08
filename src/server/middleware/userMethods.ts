/**
 * ************************************
 *
 * @module  middleware/authenticate.ts
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
// import DatabaseMethods from './additionalDataMethods';



// create object which holds the authentication methods
const UserMethods: any =  {};

// registration route, new accounts are directed here and password is hashed then user is added to the db
UserMethods.hashPassword = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body.confirmPassword);
  return bcrypt.hash(req.body.confirmPassword, 10, (error: any, encrypted: any) => {
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
        db.users.findByEmail(req.body.registerEmail)
        .then((data: any) => {
          res.locals.userId = data.id;
          res.locals.issues = [];
          res.locals.questions = {};
          next();
        })
        .catch((error: any) => {
          console.log('ERROR AT findByEmail IN userMethods', error);
        })
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
UserMethods.compareHash = (req: Request, res: Response, next: NextFunction) => {
  // check if cookie is present, if so skip middleware
  if (res.locals.cookieCheck) {
    next();
  }
  // update the users remember me option
  if (req.body.rememberMe !== undefined) {
    db.users.rememberUser(req.body.loginEmail, req.body.rememberMe)
    .catch((error: any) => {
      console.log('ERROR AT rememberUser IN authenticate.ts', error);
    })
  }
  // db.users accesses methods defined in the users controller
  db.users.findByEmail(req.body.loginEmail)
  .then((data: userDataFromDb) => {
    bcrypt.compare(req.body.loginPassword, data.password, (error: Error, match: boolean) => {
      if (match) {
        res.locals.userId = data.id;
        res.locals.loginEmail = data.email;
        res.locals.rememberMe = data.remember;
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

// method for storing user issues in the db
UserMethods.addIssues = (req: Request, res: Response, next: NextFunction) => {
  db.users.addIssues(req.body.userId, req.body.issues)
  .then((questionData: any) => {
    res.locals.issues = req.body.issues;
    res.locals.questions = questionData;
    next();
  })
  .catch((error: any) => {
    console.log('ERROR AT addIssues IN userMethods.ts', error);
  });
}

// method for getting a users issues out of the db
UserMethods.getIssues = async (req: Request, res: Response, next: NextFunction) => {
  let userReference: any; 
  if(req.body.userId) {
    await db.users.findById(req.body.userId)
    .then((userData: any) => {
      userReference = userData.email;
      res.locals.userId = userData.id;
    })
  }
  else {
    userReference = req.body.loginEmail;
  }
  db.users.getIssues(userReference)
  .then((data: any) => {
    let issues: any = {};
    let issuesArray: any[] = []; 

    data.forEach((item: any) => {
      issues[item.issue] = item.bias
      issuesArray.push(item.issue);
    })
    res.locals.userId = (res.locals.userId) ? res.locals.userId: data.user;
    res.locals.issues = issues;
    db.data.getIssueQuestions(issuesArray)
    .then((questions: any) => {
      res.locals.questions = questions;
      next();
    })
    .catch((error: any) => {
      console.log('ERROR AT getIssueQuestions IN userMethods.ts', error);
    })
  })
  .catch((error: any) => {
    console.log('ERROR AT getIssues IN userMethods.ts', error);
  })
}

// method for returning the questions relevant to the users selected issues
UserMethods.getQuestions = (req: Request, res: Response, next: NextFunction) => {
  db.users.getQuestions(req.body.issues)
  .then((questionData: any) => {
    res.locals.questionData = questionData;
    next();
  })
  .catch((error: any) => {
    console.log('ERROR at getQuiestions IN userMethods.ts', error);
  })
}

export default UserMethods;
