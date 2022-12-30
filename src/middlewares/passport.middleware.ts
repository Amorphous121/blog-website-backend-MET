import passport from 'passport';
import _ from 'lodash';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';

import UserModel from '../models/user.model';
import { getUserById } from 'services/user.service';
import { ITokenData } from 'interfaces/user.interface';
import CONFIG from 'config';
import HttpException from 'exception/HttpException';

passport.use(
  new LocalStrategy(
    { usernameField: 'usernameOrEmail', passwordField: 'password', session: false },
    async (usernameOrEmail, password, done) => {
      const user = await UserModel.findOne(
        {
          $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
        },
        { _id: 1, password: 1 }
      );
      if (user === null) return done(null, false, { message: 'Invalid credentials.' });
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) return done(null, false, { message: 'Invalid credentials.' });
      return done(null, _.omit(user.toObject(), ['password']), {
        message: 'User logged in successfully.'
      });
    }
  )
);

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: CONFIG.JWT_SECRET,
      ignoreExpiration: false
    },
    async (payload: ITokenData, done: VerifiedCallback) => {
      const { _id } = payload;
      const user = await getUserById(_id);
      if (user == null) return done(new HttpException(404, 'Invalid token!'), false);
      done(null, _.omit(user, ['password']));
    }
  )
);
