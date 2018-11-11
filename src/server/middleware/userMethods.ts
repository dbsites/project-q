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

// account creation and password hashing
UserMethods.createAccount = (req: Request, res: Response, next: NextFunction) => {
  // hash the user password using bcrypt
  return bcrypt.hash(req.body.confirmPassword, 10, (error: any, encrypted: any) => {
    // if the hashing fails, respond with a server failure
    if (error) {
      console.log('ERROR IN authenticate.ts for Encryption', error);
      res.status(500).send('SERVER ERROR');
    }
    else {
      // db.users accesses methods defined in users repo
      db.users.add(req.body, encrypted)
      .then((userObject: any) => {

          res.locals.user.userId = userObject.id;
          res.locals.user.rememberMe = false;
          res.locals.user.surveyComplete = false;
          res.locals.user.issuesComplete = false;
          res.locals.user.firstName = req.body.firstName;
          res.locals.user.lastName = req.body.lastName;
          res.locals.user.issues = {};

          // call next middleware, Sessions.start
          // res.locals.user = {userId: string, rememberMe: bool, surveyComplete: bool, issuesComplete: bool, firstName: string, lastName: string }
          next();
        })
      .catch((error: any) => {
        console.log('ERROR AT createAccount IN userMethods.ts', error);
        res.send(500).send('SERVER FAILURE');
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

// method for getting a users account information
UserMethods.getAccountInfo = (req: Request, res: Response, next: NextFunction) => {
  //res.locals.user = { userId: string, isAuth: boolean }
  
  // create a user reference based on dynamically present data
  let userReference = (res.locals.user.userId) ? res.locals.user.userId : req.body.userId;
  
  // query db for user information
  db.users.getAccountData(userReference)
  .then((userData: any) => {
    // translate user data into the shape needed for the front end
    res.locals.user.firstName = userData.first_name;
    res.locals.user.lastName = userData.last_name;
    res.locals.user.issuesComplete = userData.issues_complete;
    res.locals.user.surveyComplete = userData.survey_complete;

    // call next middleware, UserMethods.getIssues
    // res.locals.user = {userId: string, isAuth: bool, firstName: string, lastName: string, issuesComplete: bool, surveryComplete: bool }
    next();
  })
  .catch((error: any) => {
    console.log('ERROR AT getAccountInfo IN userMethods.ts', error);
    res.status(500).send('SERVER ERROR');
  })
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
UserMethods.getIssues = (req: Request, res: Response, next: NextFunction) => {
  // res.locals.user = {userId: string, isAuth: bool, firstName: string, lastName: string, issuesComplete: bool, surveryComplete: bool }

  // if user has not chosen their issues, move on
  if (!res.locals.user.issuesComplete) {
    next();
  }

  // dynamically assign a variable for the getIssues query
  let userReference: string;
  if(req.cookies.userId) {
    userReference = req.cookies.userId;
  }
  else {
    userReference = req.body.userId;
  }

  // get the issues from the userIssues table, specific to a particular user
   db.users.getIssues(userReference)
   .then((issues: any[]) => {
    // this object will be a part of the output object sent to the front end
    res.locals.user.issues = {};

    let userHasIssues = issues.length;

    if (userHasIssues) {
      // iterate through the issue objects returned from the getIssues query
      issues.forEach((issueObject: any) => {
        // declare issue id for readability
        let issueId = issueObject.issue;
  
        // add to teh issues object for the front end, issueId is the key and the bias is the value
        res.locals.users.issues[issueId] = {};
        res.locals.user.issues[issueId].issueId = issueId;
        res.locals.user.issues[issueId].issue = issueObject.issue_name;
        res.locals.user.issues[issueId].blurb = issueObject.description;
        res.locals.user.issues[issueId].position = issueObject.position;
      })
  
      // move on to UserMethods.getQuestions out of the database for userIssues
      // res.locals.user = {userId: string, isAuth: bool, firstName: string, lastName: string issuesComplete: bool, surveryComplete: bool, issues: object }
      next();
    } else next();
  })
  .catch((error: any) => {
    console.log('ERROR AT getIssues IN userMethods.ts', error);
    res.status(500).send('SERVER ERROR');
  });

}

// method for returning the questions relevant to the users selected issues
UserMethods.getQuestions = (_: Request, res: Response, next: NextFunction) => {
   // res.locals.user = {userId: string, isAuth: bool, firstName: string, lastName: string issuesComplete: bool, surveryComplete: bool, issues: object }

  // if user has not chosen their issues and not taken the survey, move on
  if (!res.locals.user.issuesComplete && res.locals.user.surveyComplete) {
    next();
  }
  else {
    // query database for questions for user issues questionData = {id: v4, question: text, bias: text, agree: boolean, issueId: v4}
    db.users.getQuestions(res.locals.user.userId)
    .then((questionData: any) => {
      // take each questionData object returned from the database and translate it to the user response object
      questionData.forEach((questionObject : any) =>{
        res.locals.user.issues[questionObject.issue_id][questionObject.id] = {};
        res.locals.user.issues[questionObject.issue_id][questionObject.id].questionId = questionObject.id;
        res.locals.user.issues[questionObject.issue_id][questionObject.id].questionText = questionObject.question;
        res.locals.user.issues[questionObject.issue_id][questionObject.id].bias = questionObject.bias;
        res.locals.user.issues[questionObject.issue_id][questionObject.id].agree = questionObject.agree;
      });
      // move on to end fetch and return response object
      // res.locals.user = {userId: string, isAuth: bool, firstName: string, lastName: string issuesComplete: bool, surveryComplete: bool, issues: object }
      next();
    })
    .catch((error: any) => {
      console.log('ERROR at getQuestions IN userMethods.ts', error);
      res.status(500).send('SERVER ERROR');
    })
  }
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
