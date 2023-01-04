import { RequestHandler } from 'express';

import { getSuccessResponse } from 'utils/response.util';
import HttpException from 'exception/HttpException';
import * as UserService from '../services/user.service';

export const getAllUsers: RequestHandler<{ id: string }, any, {}, {}> = async (req, res, next) => {
  const users = await UserService.getAllUsers();
  return res.status(200).json({ users });
};

export const getUserById: RequestHandler<{ userId: string }, any, {}, {}> = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await UserService.getUserById(userId);
    if (user == null) throw new HttpException(404, "User doesn't exists with given id.");
    return res.status(200).json(getSuccessResponse('User fetched successfully.', user));
  } catch (error) {
    return next(error);
  }
};
