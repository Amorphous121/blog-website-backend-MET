import { ObjectId, PopulatedDoc } from 'mongoose';

import { IUser } from './user.interface';

export interface IDeletionFields {
  isDeleted: boolean
  deletedAt: Date
  deletedBy: ObjectId | PopulatedDoc<IUser>
}

export interface IDateUpdateFields {
  createdAt: Date
  updatedAt: Date
}
