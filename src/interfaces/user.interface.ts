import { IDateUpdateFields, IDeletionFields } from './common.interface';

export interface IUser extends IDeletionFields, IDateUpdateFields {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  isPrivateAccount: boolean
}

export interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>
  getFullName: () => string
}
