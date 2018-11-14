/**
 * ***********************************
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
        
        // translate data into user response object
        res.locals.user = {};
        res.locals.user.userId = userObject.id;
        res.locals.user.surveyComplete = false;
        res.locals.user.issuesComplete = false;
        res.locals.user.firstName = req.body.firstName;
        res.locals.user.lastName = req.body.lastName;

        // call next middleware, Sessions.start
        // res.locals.user = {userId: string, rememberMe: bool, surveyComplete: bool, issuesComplete: bool, firstName: string, lastName: string }
        next();
      })
      .catch((error: any) => {
        if (error.code === '23505') {
          console.log('***ACCOUNT ALREADY EXISTS***', error.error);
          res.status(401).send('REGISTRATION FAILURE');
        }
        else {
          console.log('ERROR AT createAccount IN userMethods.ts', error.error);
          res.status(500).send('SERVER FAILURE');
        }
      });
    }
  })
}

// login route, user plaint text pw is compared against the hash, if correct the middleware moves along,
//  if the password is incorrect middleware chain breaks and the front recieves and incorrect password response
UserMethods.login = async (req: Request, res: Response, next: NextFunction) => {
  // update the users remember me option
  if (req.body.rememberMe !== undefined) {
    await db.users.rememberUser(req.body.loginEmail, req.body.rememberMe)
    .catch((error: any) => {
      console.log('ERROR AT rememberUser IN authenticate.ts', error);
    })
  }
  // db.users accesses methods defined in the users controller
  db.users.findByEmail(req.body.loginEmail)
  .then((data: userDataFromDb) => {
    // if user does not exist
    if (!data) {
      res.status(401).send('INVALID CREDENTIALS');
    }
    else {
      // user bcrypt to compate the plaintext password to the encrypted hash
      bcrypt.compare(req.body.loginPassword, data.password, (error: Error, match: boolean) => {
        if (match) {
          // builds the desired front end user object
          res.locals.user = {};
          res.locals.user.userId = data.id;
          // call next to advance to Session.create
          // res.locals.user = {userId: string, remember: boolean }
          next();
        }
        else if (!match) {
          res.status(401).send('Incorrect Credentials');
        }
        else {
          console.log('ERROR AT COMPARE IN userMethods.ts', error);
          res.sendStatus(500);
        }
      })
    }
  })
  .catch((error: any) => {
    console.log('ERROR AT USER FIND BY EMAIL IN userMethods.ts', error);
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
UserMethods.addIssues = (req: Request, res: Response, next: NextFunction) => {
  // instantiate the user response object
  res.locals.user = {};
  res.locals.user.userId = req.body.userId;

  // array of issueIds
  const arrayOfIssueIds = Object.keys(req.body.issues);
  res.locals.arrayOfIssueIds = arrayOfIssueIds;

  // query the db to insert issues for a user sent in from the front end
  db.users.addIssues(req.body.userId, req.body.issues, arrayOfIssueIds)
  .then(() => {
    // now move on to create issues object for front end response object in UserMethods.getIssues
    // add this to locals for control flow through the questions middleware
    res.locals.user.issuesComplete = true;
    // res.locals.user.issues = { userId: string, issuesComplete: bool }
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
  else if (res.locals.user.userId) {
    userReference = res.locals.user.userId;
  }
  else {
    userReference = req.body.userId;
  }
  
  // get the issues from the userIssues table, specific to a particular user
  db.users.getIssues(userReference)
  .then((issues: any[]) => {
    
    let userHasIssues = issues.length;
    
    if (userHasIssues) {
      // this object will be a part of the output object sent to the front end
      res.locals.user.issuesSelected = {};
      
      // iterate through the issue objects returned from the getIssues query
      issues.forEach((issueObject: any) => {
        // declare issue id for readability
        let issueId = issueObject.issue_id;
        // add to teh issues object for the front end, issueId is the key and the bias is the value
        res.locals.user.issuesSelected[issueId] = issueObject.position;
      })
      
      // move on to UserMethods.getQuestions out of the database for userIssues
      // res.locals.user = {userId: string, isAuth: bool, firstName: string, lastName: string issuesComplete: bool, surveryComplete: bool, issuesSelected: object }
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
  // res.locals.user = {userId: string, isAuth: bool, firstName: string, lastName: string issuesComplete: bool, surveryComplete: bool, issuesSelected: object }
  
  // if user has not chosen their issues and not taken the survey, move on
  if (!res.locals.user.issuesComplete && !res.locals.user.surveyComplete) {
    next();
  }
  else {
    // query database for questions for user issues questionData = {id: v4, question: text, bias: text, agree: boolean, issueId: v4}
    db.users.getQuestions(res.locals.user.userId, res.locals.arrayOfIssueIds, res.locals.user.surveryComplete)
    .then((questionData: any) => {

      // instantiate questions object
      res.locals.user.questions = {};
      
      // take each questionData object returned from the database and translate it to the user response object
      questionData.forEach((questionObject : any) => {
        if (res.locals.user.questions[questionObject.issue_id]) {
          res.locals.user.questions[questionObject.issue_id][questionObject.id] = {};
          res.locals.user.questions[questionObject.issue_id][questionObject.id].questionId = questionObject.id;
          res.locals.user.questions[questionObject.issue_id][questionObject.id].questionText = questionObject.question_text;
          res.locals.user.questions[questionObject.issue_id][questionObject.id].position = questionObject.position;
          res.locals.user.questions[questionObject.issue_id][questionObject.id].agree = (questionObject.agree) ? questionObject.agree : null;
        }
        else {
          res.locals.user.questions[questionObject.issue_id] = {};
          res.locals.user.questions[questionObject.issue_id][questionObject.id] = {};
          res.locals.user.questions[questionObject.issue_id][questionObject.id].questionId = questionObject.id;
          res.locals.user.questions[questionObject.issue_id][questionObject.id].questionText = questionObject.question_text;
          res.locals.user.questions[questionObject.issue_id][questionObject.id].position = questionObject.position;
          res.locals.user.questions[questionObject.issue_id][questionObject.id].agree = (questionObject.agree) ? questionObject.agree : null;
        }
      });
      // move on to end fetch and return response object
      // res.locals.user = {userId: string, isAuth: bool, firstName: string, lastName: string issuesComplete: bool, surveryComplete: bool, issuesSelected: object }
      next();
    })
    .catch((error: any) => {
      console.log('ERROR at getQuestions IN userMethods.ts', error);
      res.status(500).send('SERVER ERROR');
    })
  }
}

// method for storing the user response to the survey
UserMethods.updateIssuePositons = async (req: Request, _: Response, next: NextFunction) => {
  
  // build an array of issue Ids
  const issueIds = Object.keys(req.body.issues);
  
  // for each id update the user_issues table
  for (let i = 0; i < issueIds.length; i += 1) {
    await db.users.updateIssuePosition(req.body.userId, issueIds[i],req.body.issues[issueIds[i]])
  }
  
  // call next middleware to update user answers table
  // no res.locals
  next();
}

UserMethods.updateIssuesComplete = (req: Request, res: Response, next: NextFunction) => {
  db.users.updateIssuesComplete(req.body.userId, res.locals.user.issuesComplete)
  .then(() => {
    // move on to get the account data
    // res.locals.user = { userId: string, issues: {}, issuesComplete: bool }
    next();
  })
  .catch((error: any) => {
    console.log('ERROR AT updateIssuesComplete IN userMethods.ts', error);
    res.status(500).send('SERVER FAILURE');
  })
}

UserMethods.updateSurveyComplete = (req: Request, res: Response, next: NextFunction) => {
  db.users.updateSurveyComplete(req.body.userId, res.locals.user.surveyComplete)
  .then(() => {
    // move on to get company data for the dashboard
      // res.locals.user = { surveyComplete: true }
    next();
  })
  .catch((error: any) => {
    console.log('ERROR AT updateIssuesComplete IN userMethods.ts', error);
    res.status(500).send('SERVER FAILURE');
  })
}



UserMethods.updateUserSurvey = async (req: Request, res: Response, next: NextFunction) => {
  
  // build an array of question ids
  const questionIds = Object.keys(req.body.questions);
  
  // iterate through the questions ids to update the user answers
  for (let i = 0; i < questionIds.length; i += 1) {
    await db.users.updateUserSurvey(req.body.userId, questionIds[i], req.body.questions[questionIds[i]]);
  }

  // update locals to reflect survey complete to pass into the next middleware
  res.locals.user = {};
  res.locals.user.surveyComplete = true;

  // call next method to deliver the company list to the front end
  // res.locals.user = { surveyComplete: true }
  next();
}
    


 

export default UserMethods;
