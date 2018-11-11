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
// import the env files
import * as dotenv from 'dotenv';
dotenv.config();

const Sessions: any = {}

// give cookies and start session
Sessions.create = (_: Request, res: Response, next: NextFunction) => {
  // check for cookieCheck, if true skip middleware
  if (res.locals.cookieCheck) {
    next();
  }
  // total time = number of days * number of hours * number of minutes * number of seconds * number of milliseconds
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  const twentyMinutes = 20 * 60 * 1000;
  const cookieLength: number = (res.locals.remember) ? thirtyDays : twentyMinutes;
  res.cookie('user', res.locals.loginEmail, { maxAge: cookieLength });
  res.cookie('key', res.locals.userId, { maxAge: cookieLength });  
  next();
}

// check if the user has cookies and a valid session
Sessions.check = (req: Request, res: Response, next: NextFunction) => {
  
  // declare user object now to build throughout the middleware
  res.locals.user = {}
  
  // if no cookies are present
  if (!req.cookies.userId) {
    res.locals.user.isAuth = false;
    res.status(401).send(res.locals.user);
  }

  res.locals.user.userId = req.cookies.userId;

  // check for a valid session id in cookies
  redisClient.get(`${process.env.REDIS_KEY_PREFIX}${req.cookies.userId}`, (error, SSID) => {

    // if key is not found in sessions db, send back 401 with false isAuth
    if (error) {
      res.locals.user.isAuth = false;
      res.status(401).send(res.locals.user);
    }

    else if (SSID) {
      // assign isAuth to the result of comparing the ssid from redis with the ssid in the cookie
      res.locals.user.isAuth = (SSID === `${process.env.REDIS_SSID_PREFIX}${req.cookies.ssid}`) ? true : false;

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

export default Sessions;
