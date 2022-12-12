import { RequestHandler } from 'express';
import { ICreateUser } from 'interfaces/user.interface';
import { getSuccessResponse } from 'utils/response.util';

import * as UserService from '../services/user.service';

export const getAllUsers: RequestHandler<{ id: string }, {}> = (req, res, next) => {
  const message = UserService.getAllUsers();
  return res.status(200).send(message);
};

export const createUser: RequestHandler = async (req, res, next) => {
  const payload = req.body as ICreateUser;
  const user = await UserService.createUser(payload);
  return res.status(200).json(getSuccessResponse('User created successfully.', user));
};
