import { RequestHandler } from 'express';
import { ICreateUser } from 'interfaces/user.interface';
import { getSuccessResponse } from 'utils/response.util';

import * as UserService from '../services/user.service';

export const getAllUsers: RequestHandler<{ id: string }, {}> = async (req, res, next) => {
  const users = await UserService.getAllUsers();
  return res.status(200).json({ users });
};

export const createUser: RequestHandler<{}, any, ICreateUser, {}> = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await UserService.createUser(payload);
    return res.status(200).json(getSuccessResponse('User created successfully.', user));
  } catch (error) {
    return next(error);
  }
};

export const getUserById: RequestHandler<{ userId: string }> = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await UserService.getUserById(userId);
    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
};
