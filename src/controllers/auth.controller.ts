import { RequestHandler } from 'express';
import _ from 'lodash';

import { getSuccessResponse } from 'utils/response.util';
import { ICreateUser, IUser } from 'interfaces/user.interface';
import UserModel from 'models/user.model';
import HttpException from 'exception/HttpException';
import * as AuthService from 'services/auth.service';

export const signIn: RequestHandler = async (req, res, next) => {
  const { _id } = req.user as { _id: string };
  const token = AuthService.signIn(_id);
  return res.status(200).json(getSuccessResponse('Logged in successfully.', { token }));
};

export const signUp = async (payload: ICreateUser): Promise<Omit<IUser, 'password' | 'isDeleted' | 'deletedBy' | 'deletedAt'>> => {
  const existingUser = await UserModel.findOne({
    $or: [{ email: payload.email }, { username: payload.username }]
  }).lean();

  if (existingUser != null) {
    if (existingUser.email === payload.email) {
      throw new HttpException(422, `User with ${payload.email} already exists!`);
    }
    if (existingUser.username === payload.username) {
      throw new HttpException(422, `User with ${payload.username} already exists!`);
    }
  }

  const user = (await UserModel.create({ ...payload })).toObject();
  return _.omit(user, ['password', 'isDeleted', 'deletedBy', 'deletedAt']);
};
