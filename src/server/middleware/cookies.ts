/**
 * ************************************
 *
 * @module  middleware/cookies.ts
 * @author Team Quail
 * @date 
 * @description middleware for cookie operations
 *
 * ************************************
 */

import { Request, Response, NextFunction } from 'express';
// import db and db functionality from modular files to access db methods
import db from '../index';
// import userData interface for ts
import { userDataFromDb } from '../controllers/index';

const Cookie: any = {}

Cookie.give = (_: Request, res: Response, next: NextFunction) => {
  const sevenDays = 7 * 24 * 60 * 1000;
  const twoHours = 2 * 60 * 1000;
  const cookieLength: number = (res.locals.remember) ? sevenDays : twoHours;
  res.cookie('user', res.locals.loginEmail, { maxAge: cookieLength });
  res.cookie('key', res.locals.userId, { maxAge: cookieLength });  
  next();
}

Cookie.check = (req: Request, res: Response, next: NextFunction) => {
  // if the user has no cookies, move them along to the login auth
  if (!req.cookies.user) {
    next();
  }
  // else check the cookies, get the email and see if the id matches from the db
  else {
    db.users.findByEmail(req.cookies.user)
    .then ((data: userDataFromDb) => {
      if (data.id === req.cookies.key) {
        // if the id matches the email, redirect to bypass the login page
        res.redirect('/login/cookie');
      }
      else {
        next();
      }
    })
    .catch((error: any) => {
      console.log('ERROR AT Cookie.check IN cookies.ts', error);
    });
  }
}

export default Cookie;
