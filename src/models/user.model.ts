import { Model, model, Schema } from 'mongoose';
import { hash, compare } from 'bcrypt';

import { IUser, IUserMethods } from '../interfaces/user.interface';
import {
  schemaOptions,
  defaultSchemaFields,
  defaultPreFindMiddleware,
  defaultRegexForMiddlewares
} from './schema-utils';
import CONFIG from 'config';

type TUserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, TUserModel, IUserMethods>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    isPrivateAccount: { type: Boolean, default: false },
    ...defaultSchemaFields
  },
  { ...schemaOptions }
);

userSchema.methods.getFullName = function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
};

userSchema.methods.comparePassword = async function (
  this: IUser,
  password: string
): Promise<boolean> {
  return await compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  try {
    this.password = await hash(this.password, CONFIG.BCRYPT_HASH_ROUND);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre(defaultRegexForMiddlewares, defaultPreFindMiddleware);

userSchema.index({ email: 1, username: 1, isDeleted: 1 });
userSchema.index({ isPrivateAccount: 1, isDeleted: 1 });
const UserModel = model<IUser, TUserModel>('user', userSchema);

export default UserModel;
