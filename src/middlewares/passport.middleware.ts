import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import UserModel from '../models/user.model';

passport.use(
  new LocalStrategy(
    { usernameField: 'usernameOrEmail', passwordField: 'password', session: false },
    async (usernameOrEmail, password, done) => {
      const user = await UserModel.findOne({
        $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
      });
      if (user === null) return done(null, false, { message: 'Invalid credentials.' });
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) return done(null, false, { message: 'Invalid credentials.' });
      return done(null, user, { message: 'User logged in successfully.' });
    }
  )
);
