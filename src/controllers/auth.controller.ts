import { RequestHandler } from 'express';

import { getSuccessResponse } from 'utils/response.util';
import * as AuthService from 'services/auth.service';

export const SignIn: RequestHandler = async (req, res, next) => {
  const { _id } = req.user as { _id: string };
  const token = AuthService.signIn(_id);
  return res.status(200).json(getSuccessResponse('Logged in successfully.', { token }));
};
