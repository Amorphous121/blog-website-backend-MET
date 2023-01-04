import { IUser } from 'interfaces/user.interface';
import UserModel from 'models/user.model';
import { LeanDocument } from 'mongoose';

const defaultUserProjection = { password: 0, isDeleted: 0, deletedBy: 0, deletedAt: 0 };
type TDefaultUserDocumentReturnType = Omit<IUser, 'password' | 'isDeleted' | 'deletedBy' | 'deletedAt'>;

export const getAllUsers = async (): Promise<Array<LeanDocument<TDefaultUserDocumentReturnType>>> => {
  const users = await UserModel.find({}, defaultUserProjection).lean();
  return users;
};

export const getUserById = async (id: string): Promise<LeanDocument<TDefaultUserDocumentReturnType>> => {
  return await UserModel.findById(id, defaultUserProjection).lean();
};

export const deleteUser = (id: string): string => {
  return '';
};
