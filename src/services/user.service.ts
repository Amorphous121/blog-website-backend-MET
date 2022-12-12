import _ from 'lodash';

import { ICreateUser, IUser } from 'interfaces/user.interface';
import UserModel from 'models/user.model';

export const getAllUsers = (): string => {
  return 'Hello from express!';
};

export const createUser = async (
  payload: ICreateUser
): Promise<Omit<IUser, 'password' | 'isDeleted' | 'deletedBy' | 'deletedAt'>> => {
  const existingUser = await UserModel.findOne({
    $or: [{ email: payload.email }, { username: payload.username }]
  }).lean();

  if (existingUser != null) {
    if (existingUser.email === payload.email) {
      throw new Error(`User with ${payload.email} already exists!`);
    } else if (existingUser.username === payload.username) {
      throw new Error(`User with ${payload.username} already exists!`);
    }
  }

  const user = (await UserModel.create({ ...payload })).toObject();
  return _.omit(user, ['password', 'isDeleted', 'deletedBy', 'deletedAt']);
};
