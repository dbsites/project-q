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
        // builds the desired front end user object
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
UserMethods.addIssues = (req: Request, _: Response, next: NextFunction) => {
  // query the db to insert issues for a user sent in from the front end
  db.users.addIssues(req.body.userId, req.body.issues)
  .then(() => {
    next();
  })
  .catch((error: any) => {
    console.log('ERROR AT addIssues IN userMethods.ts', error);
  });
}

// method for getting a users issues out of the db
UserMethods.getIssues = async (req: Request, res: Response, next: NextFunction) => {
  // check if cookie is present, if so skip middleware
  // dynamically assign a variable for the getIssues query
  let userReference: any; 
  // if coming from a /userIssues this will be true
  if(req.body.userId) {
    // get the email and id
   await db.users.findById(req.body.userId)
    .then((userData: any) => {
      // assign reference to change the flow of the getIssues query
      userReference = userData.email;
      // add the userId to the output object
      res.locals.userId = userData.id;
    })
  }
  // if coming from login route this will be true
  else {
    userReference = req.body.loginEmail;
  }
  // get the issues from the userIssues table, specific to a particular user
   db.users.getIssues(userReference)
  .then((data: any) => {
    // this object will be a part of the output object sent to the front end
    let issues: any = {};
    // this array is used to get all the questions relevant to users selected issues
    let issuesArray: any[] = []; 

    // iterate through the issue objects returned from the getIssues query
      data.issues.forEach((item: any) => {
        // add to teh issues object for the front end, issueId is the key and the bias is the value
        issues[item.issue] = item.bias
        // push the issueId on to the array in order to get the associated questions
        issuesArray.push(item.issue);
      })
      // assign the userId value, if coming from login (data.user) if coming from /userIssues (res.locals.userId)
      res.locals.userId = (res.locals.userId) ? res.locals.userId : data.user;
      // add the issues object to the object sent to the front end
      res.locals.issues = issues;
      // query db for all questions related to the users selected issues
      db.data.getIssueQuestions(issuesArray)
      .then((questions: any) => {
        // add the questions object to the objet returned to teh front end
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
  // query the db for questions related to a set of issues
  db.users.getQuestions(req.body.issues)
  .then((questionData: any) => {
    // pass along the questionData from the query
    res.locals.questionData = questionData;
    next();
  })
  .catch((error: any) => {
    console.log('ERROR at getQuiestions IN userMethods.ts', error);
  })
}
// method for storing the user response to the survey
UserMethods.addPosition = (req: Request, res: Response, next: NextFunction) => {
  db.users.addPosition(req.body.userId, req.body.issues, req.body.questions)
  .then((responseObject: any) => {
    // iterate through the response object to build the locals object
    res.locals.userId = req.body.userId;
    res.locals.issues = responseObject.issues;
    res.locals.questions = responseObject.questions;
    next();
  })
  .catch((error: any) => {
    console.log('ERROR AT addPosition IN userMethods.ts', error);
  })
}

export default UserMethods;
