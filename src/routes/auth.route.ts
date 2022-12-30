import passport from 'passport';
import { Router } from 'express';

import { validate } from 'middlewares/validation.middleware';
import { UserLoginValidation } from 'validations/user.validation';
import * as AuthController from 'controllers/auth.controller';

const authRouter = Router();

authRouter.post(
  '/login',
  validate(UserLoginValidation),
  passport.authenticate('local', { session: false }),
  AuthController.SignIn
);

export default authRouter;
