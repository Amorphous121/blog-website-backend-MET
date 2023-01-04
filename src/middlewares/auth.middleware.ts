import HttpException from 'exception/HttpException';
import { RequestHandler } from 'express';
import { IUser } from 'interfaces/user.interface';
import passport from 'passport';

export const checkAuthorization = (roles: string | string[]): RequestHandler => {
  return (req, res, next) => {
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    const user = req.user as Omit<IUser, 'password'>;
    if (user != null && user.role.length > 0) {
      return allowedRoles.includes(user.role) ? next() : next(new HttpException(403, 'You do not have sufficient access to this route.'));
    } else {
      next(new HttpException(403, 'You do not have sufficient access to this route.'));
    }
  };
};

export const checkAuthentication: RequestHandler = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, (err, user, info) => {
    console.log(user);
    if (user == null || user === false || err != null) {
      next(new HttpException(401, 'Invalid token!'));
    }
    req.user = user;
    next();
  })(req, res, next);
};
