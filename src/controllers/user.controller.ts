import { RequestHandler } from 'express';
import { ICreateUser } from 'interfaces/user.interface';
import { getSuccessResponse } from 'utils/response.util';

import * as UserService from '../services/user.service';

export const getAllUsers: RequestHandler<{ id: string }, {}> = async (req, res, next) => {
  const users = await UserService.getAllUsers();
  return res.status(200).json({ users });
};

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body as ICreateUser;
    const user = await UserService.createUser(payload);
    return res.status(200).json(getSuccessResponse('User created successfully.', user));
  } catch (error) {
    return next(error);
  }
};

export const getUserById: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserService.getUserById(id);
    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
};
