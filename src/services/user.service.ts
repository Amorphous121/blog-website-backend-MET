import _ from 'lodash';

import { ICreateUser, IUser } from 'interfaces/user.interface';
import UserModel from 'models/user.model';
import { LeanDocument } from 'mongoose';

const defaultUserProjection = { password: 0, isDeleted: 0, deletedBy: 0, deletedAt: 0 };
type TDefaultUserDocumentReturnType = Omit<
IUser,
'password' | 'isDeleted' | 'deletedBy' | 'deletedAt'
>;

export const getAllUsers = async (): Promise<
Array<LeanDocument<TDefaultUserDocumentReturnType>>
> => {
  const users = await UserModel.find({}, defaultUserProjection).lean();
  return users;
};

export const getUserById = async (
  id: string
): Promise<LeanDocument<TDefaultUserDocumentReturnType>> => {
  const user = await UserModel.findById(id, defaultUserProjection).lean();

  if (user == null) throw new Error('No such user exists with given id');
  return user;
};

export const createUser = async (payload: ICreateUser): Promise<TDefaultUserDocumentReturnType> => {
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
