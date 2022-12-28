import { IDateUpdateFields, IDefaultFields } from './common.interface';

export interface IUser extends IDefaultFields, IDateUpdateFields {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  role: string
  isPrivateAccount: boolean
}

export interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>
  getFullName: () => string
}

export interface ICreateUser {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
}

export interface IUpdateUser {
  firstName: string
  lastName: string
  email: string
  username: string
}
