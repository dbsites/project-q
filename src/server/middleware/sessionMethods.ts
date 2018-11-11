/**
 * ************************************
 *
 * @module  middleware/cookies.ts
 * @author Team Quail
 * @date 
 * @description middleware for sessions control
 *
 * ************************************
 */

// import types from express for req, res, next
import { Request, Response, NextFunction } from 'express';
// import the connection to the redis client
import redisClient from '../redis';
 // import v4 to generate ssids
import { v4 } from 'uuid';
// import constants
import { THIRTY_DAYS, TWENTY_MINUTES } from '../constants/constants'
// import the env files
import * as dotenv from 'dotenv';
dotenv.config();

const Sessions: any = {}

// authenticate the user object and start a user session
Sessions.create = async (_: Request, res: Response, next: NextFunction) => {
  // res.locals.user = {userId: string, rememberMe: bool, surveyComplete: bool, issuesComplete: bool, firstName: string, lastName: string }
  
  // create a session in redis with the key from userid and a new v4 key assigned as the value 
  const SSID = v4();
  await redisClient.set(`${<string>process.env.REDIS_KEY_PREFIX}${res.locals.user.userId}`, `${<string>process.env.REDIS_SSID_PREFIX}${SSID}`);

  // declare variables to determine expiration date in milliseconds
  const expirationDate: number = (res.locals.user.remember) ? THIRTY_DAYS : TWENTY_MINUTES;
  // set the session expiration date
  redisClient.expire(`${<string>process.env.REDIS_KEY_PREFIX}${res.locals.user.userId}`, expirationDate);
  
  // create a cookie for the user
  res.cookie(<string>process.env.COOKIES_KEY, res.locals.user.userId, { maxAge: expirationDate });
  res.cookie(<string>process.env.COOKIES_VALUE, SSID, { maxAge: expirationDate });  
  res.locals.user.isAuth = true;

  // move on to end the reponse
  // res.locals.user = {userId: string, rememberMe: bool, surveyComplete: bool, issuesComplete: bool, firstName: string, lastName: string, isAuth: bool }
  next();
}

// check if the user has cookies and a valid session
Sessions.check = (req: Request, res: Response, next: NextFunction) => {
  
  // declare user object now to build throughout the middleware
  res.locals.user = {}
  
  // if no cookies are present
  if (!req.cookies[<string>process.env.COOKIES_KEY]) {
    res.locals.user.isAuth = false;
    res.status(401).send(res.locals.user);
  }
  
  res.locals.user.userId = req.cookies[<string>process.env.COOKIES_KEY];
  
  // check for a valid session id in cookies
  redisClient.get(`${<string>process.env.REDIS_KEY_PREFIX}${req.cookies[<string>process.env.COOKIES_KEY]}`, (error, SSID) => {
    
    // if key is not found in sessions db, send back 401 with false isAuth
    if (error) {
      res.locals.user.isAuth = false;
      res.status(401).send(res.locals.user);
    }
    
    else if (SSID) {
      // assign isAuth to the result of comparing the ssid from redis with the ssid in the cookie
      res.locals.user.isAuth = (SSID === `${<string>process.env.REDIS_SSID_PREFIX}${req.cookies[<string>process.env.COOKIES_VALUE]}`) ? true : false;
      
      // if valid session, call next to get user data
      if (res.locals.user.isAuth) {
        // move to next middlewear, UserMethods.getIssues to continue building the response object
        // res.locals.user = { userId: string, isAuth: boolean }
        next();
      }
      
      // else send 401 with false isAuth
      else {
        res.status(401).send(res.locals.user);
      }
    }
  })
}

// method to delete user sessions and deauthorize
Sessions.end = async (req: Request, res: Response, next: NextFunction) => {
  // dynamically generate a user reference to logout with or without a cookie
  let userReference: string;
  console.log('HERE!');

  // if the user is logging out but does not have an active cookie
  if (!req.cookies[<string>process.env.COOKIES_KEY]) {
    userReference = `${<string>process.env.REDIS_KEY_PREFIX}${req.body.userId}`
  }
  else {
    userReference = `${<string>process.env.REDIS_KEY_PREFIX}${req.cookies[<string>process.env.COOKIES_KEY]}`
    // delete the cookie
    res.clearCookie(<string>process.env.COOKIES_KEY);
    res.clearCookie(<string>process.env.COOKIES_VALUE);
  }
  // deauthorize the user, so front end can render login page
  res.locals.user = {};
  res.locals.user.isAuth = false;

  //check if an active session exists
  if (await redisClient.exists(userReference)) {
    // delete the session id from redis
    redisClient.del(userReference);
  }

  // move on to end the response
  // res.locals.user = { isAuth: false }
  next();
}

export default Sessions;
