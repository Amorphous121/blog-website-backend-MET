import passport from 'passport';
import { Router } from 'express';

import { validate } from 'middlewares/validation.middleware';
import { UserLoginValidation } from 'validations/user.validation';

const authRouter = Router();

authRouter.post(
  '/login',
  validate(UserLoginValidation),
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    return res.json(req.user);
  }
);

export default authRouter;
